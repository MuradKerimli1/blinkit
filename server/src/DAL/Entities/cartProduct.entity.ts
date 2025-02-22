import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { IsNumber } from "class-validator";
import { Product } from "./product.entity";

@Entity()
export class CartProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ default: 1 })
  @IsNumber()
  quantity: number;

  @ManyToOne(() => User, (user) => user.shopping_cart)
  user: User;
}
