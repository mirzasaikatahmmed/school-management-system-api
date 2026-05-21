import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { TransportRoute } from './entities/transport-route.entity';
import { TransportVehicle } from './entities/transport-vehicle.entity';
import { TransportStoppage } from './entities/transport-stoppage.entity';
import { TransportAssign } from './entities/transport-assign.entity';
import { CreateTransportRouteDto } from './dto/create-transport-route.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateStoppageDto } from './dto/create-stoppage.dto';
import { AssignStudentDto } from './dto/assign-student.dto';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(TransportRoute)
    private readonly routeRepo: Repository<TransportRoute>,
    @InjectRepository(TransportVehicle)
    private readonly vehicleRepo: Repository<TransportVehicle>,
    @InjectRepository(TransportStoppage)
    private readonly stoppageRepo: Repository<TransportStoppage>,
    @InjectRepository(TransportAssign)
    private readonly assignRepo: Repository<TransportAssign>,
  ) {}

  async createRoute(dto: CreateTransportRouteDto): Promise<TransportRoute> {
    return this.routeRepo.save(this.routeRepo.create(dto));
  }

  async getRoutes(branchId?: number): Promise<TransportRoute[]> {
    const where = branchId ? { branchId } : {};
    return this.routeRepo.find({ where, order: { name: 'ASC' } } as any);
  }

  async findRoute(id: number): Promise<TransportRoute> {
    const route = await this.routeRepo.findOne({ where: { id } });
    if (!route) throw new NotFoundException('Route not found');
    return route;
  }

  async updateRoute(
    id: number,
    dto: Partial<CreateTransportRouteDto>,
  ): Promise<TransportRoute> {
    const route = await this.findRoute(id);
    Object.assign(route, dto);
    return this.routeRepo.save(route);
  }

  async removeRoute(id: number): Promise<void> {
    const route = await this.findRoute(id);
    await this.routeRepo.remove(route);
  }

  async createVehicle(dto: CreateVehicleDto): Promise<TransportVehicle> {
    return this.vehicleRepo.save(this.vehicleRepo.create(dto));
  }

  async getVehicles(branchId?: number): Promise<TransportVehicle[]> {
    const where = branchId ? { branchId } : {};
    return this.vehicleRepo.find({ where });
  }

  async findVehicle(id: number): Promise<TransportVehicle> {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async updateVehicle(
    id: number,
    dto: Partial<CreateVehicleDto>,
  ): Promise<TransportVehicle> {
    const vehicle = await this.findVehicle(id);
    Object.assign(vehicle, dto);
    return this.vehicleRepo.save(vehicle);
  }

  async removeVehicle(id: number): Promise<void> {
    const vehicle = await this.findVehicle(id);
    await this.vehicleRepo.remove(vehicle);
  }

  createStoppage(dto: CreateStoppageDto) {
    return this.stoppageRepo.save(this.stoppageRepo.create(dto));
  }

  getStoppages(routeId?: number, branchId?: number) {
    const where: any = {};
    if (routeId) where.routeId = routeId;
    if (branchId) where.branchId = branchId;
    return this.stoppageRepo.find({ where, order: { name: 'ASC' } });
  }

  async updateStoppage(id: number, dto: Partial<CreateStoppageDto>) {
    const s = await this.stoppageRepo.findOneBy({ id });
    if (!s) throw new NotFoundException('Stoppage not found');
    return this.stoppageRepo.save({ ...s, ...dto });
  }

  async removeStoppage(id: number) {
    const s = await this.stoppageRepo.findOneBy({ id });
    if (!s) throw new NotFoundException('Stoppage not found');
    return this.stoppageRepo.remove(s);
  }

  assignStudent(dto: AssignStudentDto) {
    return this.assignRepo.save(this.assignRepo.create(dto));
  }

  getAssignments(filters: {
    studentId?: number;
    routeId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.assignRepo.createQueryBuilder('a');
    if (filters.studentId)
      qb.andWhere('a.studentId = :studentId', { studentId: filters.studentId });
    if (filters.routeId)
      qb.andWhere('a.routeId = :routeId', { routeId: filters.routeId });
    if (filters.branchId)
      qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('a.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async removeAssignment(id: number) {
    const a = await this.assignRepo.findOneBy({ id });
    if (!a) throw new NotFoundException('Assignment not found');
    return this.assignRepo.remove(a);
  }
}
