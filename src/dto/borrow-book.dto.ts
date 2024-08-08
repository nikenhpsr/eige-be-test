import { IsString } from 'class-validator';

export class BorrowBookDto {
  @IsString()
  memberCode: string;

  @IsString()
  bookCode: string;
}
