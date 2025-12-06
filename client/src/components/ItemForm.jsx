import { useState } from "react";

export default function ItemForm({ refresh }) {
    const [name, setName] = useState("");

    const addItem = async (e) => {
        e.preventDefault();
        await fetch("https://projek-test.vercel.app/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        setName("");
        refresh();
    };

    return (
        <form onSubmit={addItem} className="flex gap-2 mb-4">
            <input
                type="text"
                className="border px-3 py-2 rounded-md"
                placeholder="Nama item..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-black text-white px-4 py-2 rounded-md">
                Tambah
            </button>
        </form>
    );
}
