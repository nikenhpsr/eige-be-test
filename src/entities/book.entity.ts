import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}
