import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  sizing: string[];

  @Column({ nullable: true })
  sizingShort: string;

  @Column({ nullable: true })
  measurement: string;

  @Column()
  description: string;

  @Column('simple-array')
  material: string[];

  @Column()
  content: number;

  @Column({ nullable: true })
  pricePerPiece: number;

  @Column()
  price: number;

  @Column()
  isInStock: boolean;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column('simple-array', { nullable: true })
  variants: string[];
}
