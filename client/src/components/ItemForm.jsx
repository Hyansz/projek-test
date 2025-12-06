import { useState, useEffect } from "react";

export default function ItemForm({
    refresh,
    setLoading,
    setStatusMsg,
    editItem,
    clearEdit,
}) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (editItem) setName(editItem.name);
    }, [editItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editItem) {
            setStatusMsg("Mengupdate item...");
            await fetch(
                `https://projek-test.vercel.app/api/items/${editItem._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name }),
                }
            );
        } else {
            setStatusMsg("Menambahkan item...");
            await fetch("https://projek-test.vercel.app/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
        }

        await refresh();
        setName("");
        clearEdit();

        setStatusMsg(
            editItem ? "Item berhasil diupdate" : "Item berhasil ditambahkan"
        );

        setTimeout(() => setStatusMsg(""), 1500);
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-3 mb-6 w-full max-w-md"
        >
            <input
                type="text"
                className="border border-gray-300 px-4 py-2 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-black/40 outline-none"
                placeholder="Nama item..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button className="bg-black text-white px-5 py-2 rounded-xl shadow hover:bg-gray-800 transition cursor-pointer">
                {editItem ? "Update" : "Tambah"}
            </button>
        </form>
    );
}
