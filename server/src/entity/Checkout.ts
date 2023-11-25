import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.checkouts, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  discount: { amount: number; system: string };

  @Column({ type: 'simple-json' })
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };

  @Column({ type: 'simple-json' })
  billing: { shipping: string; payment: string };

  @Column()
  isPaid: boolean;

  @Column()
  isCompleted: boolean;
}
