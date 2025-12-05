import express from "express";
import cors from "cors";
import db from "./database.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// test connection
(async () => {
    try {
        await db.authenticate();
        console.log("MySQL Connected");
    } catch (error) {
        console.error(error);
    }
})();

app.use("/api/items", itemRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("API Running on port:", PORT);
});
