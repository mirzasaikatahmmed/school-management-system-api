import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Hostel } from './entities/hostel.entity';
import { HostelRoom } from './entities/hostel-room.entity';
import { HostelCategory } from './entities/hostel-category.entity';
import { HostelAllocation } from './entities/hostel-allocation.entity';

@Injectable()
export class HostelService {
  constructor(
    @InjectRepository(Hostel)
    private readonly hostelRepo: Repository<Hostel>,
    @InjectRepository(HostelRoom)
    private readonly roomRepo: Repository<HostelRoom>,
    @InjectRepository(HostelCategory)
    private readonly categoryRepo: Repository<HostelCategory>,
    @InjectRepository(HostelAllocation)
    private readonly allocationRepo: Repository<HostelAllocation>,
  ) {}

  async createHostel(dto: Partial<Hostel>): Promise<Hostel> {
    return this.hostelRepo.save(this.hostelRepo.create(dto));
  }

  async getHostels(branchId?: number): Promise<Hostel[]> {
    const where = branchId ? { branchId } : {};
    return this.hostelRepo.find({ where, order: { name: 'ASC' } });
  }

  async findHostel(id: number): Promise<Hostel> {
    const hostel = await this.hostelRepo.findOne({ where: { id } });
    if (!hostel) throw new NotFoundException('Hostel not found');
    return hostel;
  }

  async updateHostel(id: number, dto: Partial<Hostel>): Promise<Hostel> {
    const hostel = await this.findHostel(id);
    Object.assign(hostel, dto);
    return this.hostelRepo.save(hostel);
  }

  async removeHostel(id: number): Promise<void> {
    const hostel = await this.findHostel(id);
    await this.hostelRepo.remove(hostel);
  }

  async createRoom(dto: Partial<HostelRoom>): Promise<HostelRoom> {
    return this.roomRepo.save(this.roomRepo.create(dto));
  }

  async getRooms(hostelId?: number, branchId?: number): Promise<HostelRoom[]> {
    const where: any = {};
    if (hostelId) where.hostelId = hostelId;
    if (branchId) where.branchId = branchId;
    return this.roomRepo.find({ where, order: { name: 'ASC' } });
  }

  async findRoom(id: number): Promise<HostelRoom> {
    const room = await this.roomRepo.findOne({ where: { id } });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async updateRoom(id: number, dto: Partial<HostelRoom>): Promise<HostelRoom> {
    const room = await this.findRoom(id);
    Object.assign(room, dto);
    return this.roomRepo.save(room);
  }

  async removeRoom(id: number): Promise<void> {
    const room = await this.findRoom(id);
    await this.roomRepo.remove(room);
  }

  // Categories
  createCategory(dto: any) {
    return this.categoryRepo.save(this.categoryRepo.create(dto));
  }

  getCategories(branchId?: number) {
    return this.categoryRepo.find({ where: branchId ? { branchId } : {} });
  }

  async removeCategory(id: number) {
    const c = await this.categoryRepo.findOneBy({ id });
    if (!c) throw new NotFoundException('Category not found');
    return this.categoryRepo.remove(c);
  }

  // Allocations
  allocate(dto: any) {
    return this.allocationRepo.save(this.allocationRepo.create(dto));
  }

  getAllocations(filters: {
    studentId?: number;
    hostelId?: number;
    roomId?: number;
    branchId?: number;
    sessionId?: number;
  }) {
    const qb = this.allocationRepo
      .createQueryBuilder('a')
      .orderBy('a.createdAt', 'DESC');
    if (filters.studentId)
      qb.andWhere('a.studentId = :studentId', { studentId: filters.studentId });
    if (filters.hostelId)
      qb.andWhere('a.hostelId = :hostelId', { hostelId: filters.hostelId });
    if (filters.roomId)
      qb.andWhere('a.roomId = :roomId', { roomId: filters.roomId });
    if (filters.branchId)
      qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });
    if (filters.sessionId)
      qb.andWhere('a.sessionId = :sessionId', { sessionId: filters.sessionId });
    return qb.getMany();
  }

  async removeAllocation(id: number) {
    const a = await this.allocationRepo.findOneBy({ id });
    if (!a) throw new NotFoundException('Allocation not found');
    return this.allocationRepo.remove(a);
  }
}
