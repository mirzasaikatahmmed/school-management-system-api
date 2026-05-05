import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportRoute } from './entities/transport-route.entity';
import { TransportVehicle } from './entities/transport-vehicle.entity';
import { TransportStoppage } from './entities/transport-stoppage.entity';
import { TransportAssign } from './entities/transport-assign.entity';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransportRoute,
      TransportVehicle,
      TransportStoppage,
      TransportAssign,
    ]),
  ],
  controllers: [TransportController],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
