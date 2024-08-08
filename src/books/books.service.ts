import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findByCode(code: string): Promise<Book | null> {
    return this.bookRepository.findOne({ where: { code } });
  }

  async updateStock(book: Book, quantity: number): Promise<void> {
    book.stock += quantity;
    await this.bookRepository.save(book);
  }
}
