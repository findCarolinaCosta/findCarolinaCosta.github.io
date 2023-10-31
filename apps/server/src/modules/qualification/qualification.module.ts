import { Module } from '@nestjs/common';
import { QualificationController } from './qualification.controller';
import { QualificationService } from './qualification.service';

@Module({
  controllers: [QualificationController],
  providers: [QualificationService],
})
export class QualificationModule {}
