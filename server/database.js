import { Sequelize } from "sequelize";

const db = new Sequelize("merncrud", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
