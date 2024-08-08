import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Book } from './book.entity';
import { Member } from './member.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => Member)
  member: Member;

  @Column()
  borrowedDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
