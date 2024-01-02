import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PetLikeModule } from './pet-like/pet-like.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PetsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    PetLikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
