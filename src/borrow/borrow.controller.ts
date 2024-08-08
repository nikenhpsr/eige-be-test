import { Controller, Post, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { ReturnBookDto } from '../dto/return-book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('borrows')
@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    await this.borrowService.borrowBook(borrowBookDto);
    return { message: 'Book borrowed successfully' };
  }

  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    await this.borrowService.returnBook(returnBookDto);
    return { message: 'Book returned successfully' };
  }
}
