import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hostel } from './entities/hostel.entity';
import { HostelRoom } from './entities/hostel-room.entity';
import { HostelCategory } from './entities/hostel-category.entity';
import { HostelAllocation } from './entities/hostel-allocation.entity';
import { HostelService } from './hostel.service';
import { HostelController } from './hostel.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hostel,
      HostelRoom,
      HostelCategory,
      HostelAllocation,
    ]),
  ],
  controllers: [HostelController],
  providers: [HostelService],
  exports: [HostelService],
})
export class HostelModule {}
