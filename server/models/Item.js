import { DataTypes } from "sequelize";
import db from "../database.js";

const Item = db.define(
    "items",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

// otomatis membuat tabel jika belum ada
// await Item.sync();

export default Item;
