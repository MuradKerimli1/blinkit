import { IsNotEmpty, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SubCategory } from "./subCategory.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ default: "" })
  @IsNotEmpty()
  @IsString()
  image: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    cascade: true,
  })
  subCategories: SubCategory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
