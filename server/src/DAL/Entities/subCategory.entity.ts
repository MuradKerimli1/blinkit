import { IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  @IsString()
  name: string;

  @Column({ default: "" })
  @IsString()
  image: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: "CASCADE",
  })
  category: Category;
}
