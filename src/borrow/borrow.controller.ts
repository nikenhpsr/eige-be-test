import { Controller, Post, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { ReturnBookDto } from '../dto/return-book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('borrows')
@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ type: BorrowBookDto })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully borrowed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    await this.borrowService.borrowBook(borrowBookDto);
    return { message: 'Book borrowed successfully' };
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a book' })
  @ApiBody({ type: ReturnBookDto })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully returned.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    await this.borrowService.returnBook(returnBookDto);
    return { message: 'Book returned successfully' };
  }
}
