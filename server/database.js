import { Sequelize } from "sequelize";

const db = new Sequelize("DB_NAME", "DB_USER", "DB_PASSWORD", {
    host: "https://invitaitionspi.id/",
    dialect: "mysql",
});

export default db;
