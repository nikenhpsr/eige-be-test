import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
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
}
