import "reflect-metadata"
import { DataSource } from "typeorm"
import * as entities from "./entity";

export const AppDataSource1 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "assignment_3_1",
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
})

export const AppDataSource2 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "assignment_3_2",
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
})

export const AppDataSource3 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "assignment_3_3",
    synchronize: true,
    logging: false,
    entities,
    migrations: [],
    subscribers: [],
})
