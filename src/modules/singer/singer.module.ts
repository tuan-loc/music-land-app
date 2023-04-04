import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerController } from './singer.controller';
import { Singer } from './singer.entity';
import { SingerRepository } from './singer.repository';
import { SingerService } from './singer.service';
import { AwsModule } from 'src/shared/modules/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([SingerRepository]), AwsModule],
  controllers: [SingerController],
  providers: [SingerService],
})
export class SingerModule {}
