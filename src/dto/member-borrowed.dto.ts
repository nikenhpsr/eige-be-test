import { ApiProperty } from '@nestjs/swagger';

class BorrowedBookInfo {
  @ApiProperty()
  bookCode: string;

  @ApiProperty()
  bookTitle: string;

  @ApiProperty()
  borrowedDate: Date;
}

export class MemberBorrowedBooksDto {
  @ApiProperty()
  memberCode: string;

  @ApiProperty()
  memberName: string;

  @ApiProperty({ type: [BorrowedBookInfo] })
  borrowedBooks: BorrowedBookInfo[];
}
