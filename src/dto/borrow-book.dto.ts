import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({ description: 'Member code', example: 'M001' })
  @IsString()
  memberCode: string;

  @ApiProperty({ description: 'Book code', example: 'B001' })
  @IsString()
  bookCode: string;

  @ApiProperty({ description: 'Borrowed date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  borrowedDate?: Date;
}
