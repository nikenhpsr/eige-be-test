import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Member {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  borrowedBooks: number;

  @Column({ nullable: true })
  penaltyUntil: Date;
}
