import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Staff } from './entities/staff.entity';
import { StaffDepartment } from './entities/staff-department.entity';
import { StaffDesignation } from './entities/staff-designation.entity';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
    @InjectRepository(StaffDepartment)
    private readonly deptRepo: Repository<StaffDepartment>,
    @InjectRepository(StaffDesignation)
    private readonly designationRepo: Repository<StaffDesignation>,
  ) {}

  async create(dto: CreateStaffDto): Promise<Staff> {
    return this.staffRepo.save(this.staffRepo.create(dto));
  }

  async findAll(branchId?: number, search?: string): Promise<Staff[]> {
    const qb = this.staffRepo.createQueryBuilder('s');
    if (branchId) qb.andWhere('s.branchId = :branchId', { branchId });
    if (search) {
      qb.andWhere(
        '(s.name ILIKE :q OR s.email ILIKE :q OR s.staffId ILIKE :q)',
        { q: `%${search}%` },
      );
    }
    return qb.orderBy('s.name', 'ASC').getMany();
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff member not found');
    return staff;
  }

  async update(id: number, dto: Partial<CreateStaffDto>): Promise<Staff> {
    const staff = await this.findOne(id);
    Object.assign(staff, dto);
    return this.staffRepo.save(staff);
  }

  async remove(id: number): Promise<void> {
    const staff = await this.findOne(id);
    await this.staffRepo.remove(staff);
  }

  async getDepartments(branchId?: number): Promise<StaffDepartment[]> {
    const where = branchId ? { branchId } : {};
    return this.deptRepo.find({ where, order: { name: 'ASC' } });
  }

  async createDepartment(
    name: string,
    branchId?: number,
  ): Promise<StaffDepartment> {
    return this.deptRepo.save(this.deptRepo.create({ name, branchId }));
  }

  async removeDepartment(id: number): Promise<void> {
    const dept = await this.deptRepo.findOne({ where: { id } });
    if (!dept) throw new NotFoundException('Department not found');
    await this.deptRepo.remove(dept);
  }

  async getDesignations(branchId?: number): Promise<StaffDesignation[]> {
    const where = branchId ? { branchId } : {};
    return this.designationRepo.find({ where, order: { name: 'ASC' } });
  }

  async createDesignation(
    name: string,
    branchId?: number,
  ): Promise<StaffDesignation> {
    return this.designationRepo.save(
      this.designationRepo.create({ name, branchId }),
    );
  }

  async removeDesignation(id: number): Promise<void> {
    const desig = await this.designationRepo.findOne({ where: { id } });
    if (!desig) throw new NotFoundException('Designation not found');
    await this.designationRepo.remove(desig);
  }
}
