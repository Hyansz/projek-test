import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
    const item = await Item.create(req.body);
    res.json(item);
});

// Read all
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Update
router.put("/:id", async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(item);
});

// Delete
router.delete("/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
});

export default router;
