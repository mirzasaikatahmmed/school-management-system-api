import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException } from 'nestjs-api-forge';
import { Student } from '../student/entities/student.entity';
import { Enroll } from '../student/entities/enroll.entity';
import { Parent } from '../parents/entities/parent.entity';
import { LoginCredential } from '../auth/entities/login-credential.entity';
import { TransportAssign } from '../transport/entities/transport-assign.entity';
import { HostelAllocation } from '../hostel/entities/hostel-allocation.entity';
import { Role } from '../../common/constants/roles.enum';
import { CreateAdmissionDto } from './dto/create-admission.dto';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Enroll) private enrollRepo: Repository<Enroll>,
    @InjectRepository(Parent) private parentRepo: Repository<Parent>,
    @InjectRepository(LoginCredential)
    private credRepo: Repository<LoginCredential>,
    @InjectRepository(TransportAssign)
    private transportAssignRepo: Repository<TransportAssign>,
    @InjectRepository(HostelAllocation)
    private hostelAllocationRepo: Repository<HostelAllocation>,
  ) {}

  async createAdmission(dto: CreateAdmissionDto) {
    // Check username uniqueness
    const existing = await this.credRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException(
        `Username "${dto.username}" is already taken`,
      );
    }

    return this.dataSource.transaction(async (manager) => {
      // ── 1. Guardian / Parent ──────────────────────────────────────────────
      let parentId: number;

      if (dto.guardian.alreadyExists && dto.guardian.guardianId) {
        parentId = dto.guardian.guardianId;
      } else {
        // Create parent record
        const parent = manager.create(Parent, {
          fullName: dto.guardian.name ?? '',
          relation: dto.guardian.relation,
          fatherName: dto.guardian.fatherName,
          motherName: dto.guardian.motherName,
          occupation: dto.guardian.occupation,
          income: dto.guardian.income,
          education: dto.guardian.education,
          city: dto.guardian.city,
          state: dto.guardian.state,
          phone: dto.guardian.phone,
          email: dto.guardian.email,
          address: dto.guardian.address,
          profilePhoto: dto.guardian.photo,
          branchId: dto.branchId,
        });
        const savedParent = await manager.save(Parent, parent);
        parentId = savedParent.id;

        // Create guardian login credential if username/password provided
        if (dto.guardian.username && dto.guardian.password) {
          const hashedGuardianPwd = await bcrypt.hash(
            dto.guardian.password,
            10,
          );
          const guardianCred = manager.create(LoginCredential, {
            userId: parentId,
            username: dto.guardian.username,
            password: hashedGuardianPwd,
            role: Role.PARENT,
            active: true,
          });
          const savedGuardianCred = await manager.save(
            LoginCredential,
            guardianCred,
          );
          await manager.update(Parent, parentId, {
            loginCredentialId: savedGuardianCred.id,
          });
        }
      }

      // ── 2. Student ────────────────────────────────────────────────────────
      const student = manager.create(Student, {
        registerNo: dto.registerNo,
        admissionDate:
          dto.admissionDate ?? new Date().toISOString().split('T')[0],
        firstName: dto.firstName,
        lastName: dto.lastName,
        gender: dto.gender,
        birthday: dto.birthday,
        religion: dto.religion,
        caste: dto.caste,
        bloodGroup: dto.bloodGroup,
        motherTongue: dto.motherTongue,
        currentAddress: dto.currentAddress,
        permanentAddress: dto.permanentAddress,
        city: dto.city,
        state: dto.state,
        mobileno: dto.mobileno,
        email: dto.email,
        categoryId: dto.categoryId ?? 0,
        parentId,
        routeId: dto.routeId ?? 0,
        vehicleId: dto.vehicleId ?? 0,
        hostelId: dto.hostelId ?? 0,
        roomId: dto.roomId ?? 0,
        fathersNid: dto.fathersNid,
        mothersNid: dto.mothersNid,
        birthRegNo: dto.birthRegNo,
        previousSchool: dto.previousSchool,
        previousQualification: dto.previousQualification,
        remarks: dto.remarks,
        photo: dto.photo,
        branchId: dto.branchId,
        active: true,
      });
      const savedStudent = await manager.save(Student, student);

      // ── 3. Student Login Credential ───────────────────────────────────────
      const hashedPwd = await bcrypt.hash(dto.password, 10);
      const studentCred = manager.create(LoginCredential, {
        userId: savedStudent.id,
        username: dto.username,
        password: hashedPwd,
        role: Role.STUDENT,
        active: true,
      });
      const savedStudentCred = await manager.save(LoginCredential, studentCred);
      await manager.update(Student, savedStudent.id, {
        loginCredentialId: savedStudentCred.id,
      });

      // ── 4. Enrollment ─────────────────────────────────────────────────────
      const enroll = manager.create(Enroll, {
        studentId: savedStudent.id,
        classId: dto.classId,
        sectionId: dto.sectionId ?? 0,
        roll: dto.roll ?? 0,
        sessionId: dto.sessionId,
        branchId: dto.branchId,
        defaultLogin: 0,
        isAlumni: 0,
      });
      await manager.save(Enroll, enroll);

      // ── 5. Transport Assignment (optional) ────────────────────────────────
      if (dto.routeId) {
        const transportAssign = manager.create(TransportAssign, {
          studentId: savedStudent.id,
          routeId: dto.routeId,
          vehicleId: dto.vehicleId,
          stoppageId: dto.stoppageId,
          sessionId: dto.sessionId,
          branchId: dto.branchId,
        });
        await manager.save(TransportAssign, transportAssign);
      }

      // ── 6. Hostel Allocation (optional) ───────────────────────────────────
      if (dto.hostelId && dto.roomId) {
        const hostelAlloc = manager.create(HostelAllocation, {
          studentId: savedStudent.id,
          hostelId: dto.hostelId,
          roomId: dto.roomId,
          fromDate: dto.admissionDate ?? new Date().toISOString().split('T')[0],
          sessionId: dto.sessionId,
          branchId: dto.branchId,
        });
        await manager.save(HostelAllocation, hostelAlloc);
      }

      return {
        studentId: savedStudent.id,
        parentId,
        username: dto.username,
        message: 'Student admitted successfully',
      };
    });
  }

  async getAdmissions(filters: {
    branchId?: number;
    sessionId?: number;
    classId?: number;
    sectionId?: number;
    search?: string;
  }) {
    const qb = this.studentRepo
      .createQueryBuilder('s')
      .orderBy('s.createdAt', 'DESC');

    if (filters.branchId)
      qb.andWhere('s.branchId = :branchId', { branchId: filters.branchId });

    if (filters.search) {
      qb.andWhere(
        '(s.firstName ILIKE :q OR s.lastName ILIKE :q OR s.registerNo ILIKE :q OR s.mobileno ILIKE :q)',
        { q: `%${filters.search}%` },
      );
    }

    // join enrollments to filter by session/class/section
    if (filters.sessionId || filters.classId || filters.sectionId) {
      qb.innerJoin(Enroll, 'e', 'e.studentId = s.id');
      if (filters.sessionId)
        qb.andWhere('e.sessionId = :sessionId', {
          sessionId: filters.sessionId,
        });
      if (filters.classId)
        qb.andWhere('e.classId = :classId', { classId: filters.classId });
      if (filters.sectionId)
        qb.andWhere('e.sectionId = :sectionId', {
          sectionId: filters.sectionId,
        });
    }

    return qb.getMany();
  }
}
