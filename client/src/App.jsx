import { useEffect, useState } from "react";
import api from "./api";

export default function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchItems = async () => {
        const res = await api.get("/");
        setItems(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await api.put(`/${editId}`, { name });
            setEditId(null);
        } else {
            await api.post("/", { name });
        }

        setName("");
        fetchItems();
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setName(item.name);
    };

    const handleDelete = async (id) => {
        await api.delete(`/${id}`);
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    MERN CRUD
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                    <input
                        className="border px-3 py-2 rounded w-full"
                        placeholder="Nama item..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                {/* List */}
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li
                            key={item._id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded border"
                        >
                            <span>{item.name}</span>
                            <div className="flex gap-2">
                                <button
                                    className="text-green-600"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
