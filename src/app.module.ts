import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books/books.controller';
import { MembersController } from './members/members.controller';
import { BorrowController } from './borrow/borrow.controller';
import { BooksService } from './books/books.service';
import { MembersService } from './members/members.service';
import { BorrowService } from './borrow/borrow.service';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { Borrow } from './entities/borrow.entity';
import { InitialDataSeed } from './database/seeds/seed';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Book, Member, Borrow],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Book, Member, Borrow]),
  ],
  controllers: [BooksController, MembersController, BorrowController],
  providers: [BooksService, MembersService, BorrowService, InitialDataSeed],
})
export class AppModule {}
