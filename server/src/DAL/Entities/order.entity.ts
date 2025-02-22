import { IsNumber, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Product } from "./product.entity";
import { User } from "./user.entity";
import { Addreses } from "./adress.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orderHistory)
  user: User;

  @Column({ unique: true })
  @IsString()
  orderId: string;

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product[];

  @Column({ default: "" })
  @IsString()
  paymentId: string;

  @Column({ default: "" })
  @IsString()
  payment_status: string;

  @ManyToOne(() => Addreses, { nullable: true })
  delivery_address: Addreses | null;
  

  @Column({ default: 0 })
  @IsNumber()
  subTotalAmt: number;

  @Column({ default: 0 })
  @IsNumber()
  totalAmt: number;

  @Column({ default: "" })
  @IsString()
  invoice_receipt: string;
  newOrder: { name: any; image: any }[];
}
