import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { Borrow } from 'src/entities/borrow.entity';
import { MemberBorrowedBooksDto } from 'src/dto/member-borrowed.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async findByCode(code: string): Promise<Member | null> {
    return this.memberRepository.findOne({ where: { code } });
  }

  async updateBorrowedBooks(member: Member, quantity: number): Promise<void> {
    member.borrowedBooks += quantity;
    await this.memberRepository.save(member);
  }

  async setPenalty(member: Member, days: number): Promise<void> {
    const penaltyUntil = new Date();
    penaltyUntil.setDate(penaltyUntil.getDate() + days);
    member.penaltyUntil = penaltyUntil;
    await this.memberRepository.save(member);
  }

  async getMemberBorrowedBooks(
    memberCode: string,
  ): Promise<MemberBorrowedBooksDto> {
    const member = await this.memberRepository.findOne({
      where: { code: memberCode },
    });
    if (!member) {
      throw new NotFoundException(`Member with code ${memberCode} not found`);
    }

    const borrowedBooks = await this.borrowRepository.find({
      where: { member: { code: memberCode }, returnDate: undefined },
      relations: ['book'],
    });

    return {
      memberCode: member.code,
      memberName: member.name,
      borrowedBooks: borrowedBooks.map((borrow) => ({
        bookCode: borrow.book.code,
        bookTitle: borrow.book.title,
        borrowedDate: borrow.borrowedDate,
      })),
    };
  }
}
