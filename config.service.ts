import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: '12345', 
      database: 'postgres', 
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, 
      autoLoadEntities: true,
    };
  }
}
