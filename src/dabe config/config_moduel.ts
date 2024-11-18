import { Module } from '@nestjs/common';
import { PostgresConfigService } from 'config.service';

@Module({
  providers: [PostgresConfigService], // Add the service to the providers array
  exports: [PostgresConfigService],   
})
export class PostgresConfigModule {}