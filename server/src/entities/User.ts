import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Checkout } from '#entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zip: string;

  @OneToMany(() => Checkout, (checkout) => checkout.user)
  checkouts: Checkout[];
}
