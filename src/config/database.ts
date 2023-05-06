import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "127.0.0.1",
	port: 5432,
	username: "postgres",
	password: "senha123",
	database: "postgres",
	entities: [User],
	synchronize: true,
	logging: true,
	migrations: [__dirname + "./src/database/migrations/*{.ts}"],
	migrationsTableName: "migrations",
});

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});
