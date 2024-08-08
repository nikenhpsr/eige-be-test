import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from '../entities/borrow.entity';
import { BooksService } from '../books/books.service';
import { MembersService } from '../members/members.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { ReturnBookDto } from '../dto/return-book.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
    private bookService: BooksService,
    private memberService: MembersService,
  ) {}

  async borrowBook(borrowBookDto: BorrowBookDto): Promise<void> {
    const { memberCode, bookCode } = borrowBookDto;
    const member = await this.memberService.findByCode(memberCode);
    const book = await this.bookService.findByCode(bookCode);

    if (!member || !book) {
      throw new BadRequestException('Member or book not found');
    }

    if (member.borrowedBooks >= 2) {
      throw new BadRequestException('Member has already borrowed 2 books');
    }

    if (book.stock <= 0) {
      throw new BadRequestException('Book is not available');
    }

    if (member.penaltyUntil && member.penaltyUntil < new Date()) {
      throw new BadRequestException('Member is currently penalized');
    }

    const borrow = new Borrow();
    borrow.member = member;
    borrow.book = book;
    borrow.borrowedDate = borrow.borrowedDate || new Date();

    const penaltyUntil = new Date(borrow.borrowedDate);
    penaltyUntil.setDate(penaltyUntil.getDate() + 7);
    member.penaltyUntil = penaltyUntil;

    await this.borrowRepository.save(borrow);
    await this.bookService.updateStock(book, -1);
    await this.memberService.updateBorrowedBooks(member, 1);
    await this.memberService.save(member);
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<void> {
    const { memberCode, bookCode } = returnBookDto;
    const borrow = await this.borrowRepository.findOne({
      where: {
        member: { code: memberCode },
        book: { code: bookCode },
        returnDate: undefined,
      },
      relations: ['member', 'book'],
    });

    if (!borrow) {
      throw new BadRequestException('Borrow record not found');
    }

    const now = new Date();
    const borrowDuration = now.getTime() - borrow.borrowedDate.getTime();
    const borrowDays = Math.ceil(borrowDuration / (1000 * 3600 * 24));

    borrow.returnDate = now;
    await this.borrowRepository.save(borrow);
    await this.bookService.updateStock(borrow.book, 1);
    await this.memberService.updateBorrowedBooks(borrow.member, -1);

    if (borrowDays > 7) {
      await this.memberService.setPenalty(borrow.member, 3);
    }
  }
}
