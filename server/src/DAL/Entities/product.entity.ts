import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

import { SubCategory } from "./subCategory.entity";
import { Category } from "./category.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("simple-array")
  image: string[];

  @ManyToMany(() => Category)
  @JoinTable()
  @IsNotEmpty()
  category: Category[];

  @ManyToMany(() => SubCategory)
  @JoinTable()
  @IsNotEmpty()
  subCategory: SubCategory[];

  @Column({ default: "" })
  unit: string;

  @Column({ type: "int", default: 0 })
  stock: number;

  @Column({ type: "int", nullable: true })
  price: number;

  @Column({ type: "int", nullable: true })
  discount: number;

  @Column({ default: "" })
  description: string;

  @Column({ default: true })
  publish: boolean;
}
