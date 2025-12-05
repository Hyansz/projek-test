import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    const item = await Item.create(req.body);
    res.json(item);
});

// READ
router.get("/", async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const item = await Item.update(req.body, {
        where: { id: req.params.id },
    });
    res.json({ message: "Updated" });
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Item.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
});

export default router;
