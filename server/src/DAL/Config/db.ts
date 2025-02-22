import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_NAME,
  password: "",
  database: "blinkitt",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../Entities/*.{ts,js}"],
  subscribers: [],
  migrations: [],
});
