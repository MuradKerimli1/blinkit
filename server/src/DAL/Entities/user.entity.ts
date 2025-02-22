import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import {
  IsEmail,
  IsEnum,
  IsBoolean,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
} from "class-validator";
import { Addreses } from "./adress.entity";
import { CartProduct } from "./cartProduct.entity";
import { Order } from "./order.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: "password en az 6 en cox 20 simvol olmalidir" })
  password: string;

  @Column({ nullable: true, default: "" })
  @IsOptional()
  @IsString({ message: "avatar string olmalidi" })
  avatar: string;

  @Column({ nullable: true, type: "bigint", default: null })
  @IsOptional()
  @IsNumber()
  mobile: number;

  @Column({ default: "", nullable: true })
  @IsOptional()
  @IsString()
  refresh_token: string;

  @Column({ default: false, nullable: true })
  @IsOptional()
  @IsBoolean()
  verify_email: boolean;

  @Column({ nullable: true, type: "timestamp" })
  @IsOptional()
  last_login_date: Date;

  @Column({
    type: "enum",
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active",
  })
  @IsOptional()
  @IsEnum(["Active", "Inactive", "Suspended"])
  status: string;

  @OneToMany(() => Addreses, (address) => address.user)
  address_details: Addreses[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.user)
  shopping_cart: CartProduct[];

  @OneToMany(() => Order, (order) => order.user)
  orderHistory: Order[];

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  forgot_password_otp: number;

  @Column({ nullable: true, type: "timestamp" })
  @IsOptional()
  forgot_password_expiry: Date;

  @Column({ type: "enum", enum: ["ADMIN", "USER"], default: "USER" })
  @IsOptional()
  @IsEnum(["ADMIN", "USER"])
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
