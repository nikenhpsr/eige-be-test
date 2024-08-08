import { Controller, Get, Param } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberBorrowedBooksDto } from 'src/dto/member-borrowed.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Get()
  async getAllMembers() {
    return this.memberService.findAll();
  }

  @Get(':id/borrowed-books')
  @ApiOperation({ summary: "Get member's borrowed books" })
  @ApiParam({ name: 'id', description: 'Member code' })
  @ApiResponse({
    status: 200,
    description: "Member's borrowed books",
    type: MemberBorrowedBooksDto,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async getMemberBorrowedBooks(
    @Param('id') memberCode: string,
  ): Promise<MemberBorrowedBooksDto> {
    return this.memberService.getMemberBorrowedBooks(memberCode);
  }
}
