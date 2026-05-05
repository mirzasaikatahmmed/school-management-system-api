import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from 'nestjs-api-forge';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {}

  async create(dto: CreateBranchDto): Promise<Branch> {
    const existing = await this.branchRepo.findOne({
      where: { email: dto.email },
    });
    if (existing)
      throw new ConflictException('Branch with this email already exists');
    const branch = this.branchRepo.create(dto);
    return this.branchRepo.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  async update(id: number, dto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);
    Object.assign(branch, dto);
    return this.branchRepo.save(branch);
  }

  async remove(id: number): Promise<void> {
    const branch = await this.findOne(id);
    await this.branchRepo.remove(branch);
  }
}
