import { IsBoolean, IsNumber, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Addreses extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  @IsString()
  address_line: string;

  @Column({ default: "" })
  @IsString()
  city: string;

  @Column({ default: "" })
  @IsString()
  state: string;

  @Column()
  @IsString()
  pincode: string;

  @Column()
  @IsString()
  country: string;

  @Column({ nullable: true })
  @IsNumber()
  mobile: number;

  @Column({ default: true })
  @IsBoolean()
  status: boolean;

  @ManyToOne(() => User, (user) => user.address_details)
  user: User;
}
