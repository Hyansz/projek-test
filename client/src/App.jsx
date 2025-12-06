import { useEffect, useState } from "react";
import api from "./api";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import StatusModal from "./components/StatusModal";

export default function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [editItem, setEditItem] = useState(null); // ← ADD

    const fetchItems = async () => {
        setLoading(true);
        const res = await api.get("/");
        setItems(res.data);
        setLoading(false);
    };

    const handleEdit = (item) => {
        setEditItem(item); // ← kirim ke form
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

                <ItemForm
                    refresh={fetchItems}
                    setLoading={setLoading}
                    setStatusMsg={setStatusMsg}
                    editItem={editItem}
                    clearEdit={() => setEditItem(null)}
                />

                <ItemList
                    items={items}
                    refresh={fetchItems}
                    setLoading={setLoading}
                    setStatusMsg={setStatusMsg}
                    onEdit={handleEdit}
                />

                <StatusModal loading={loading} message={statusMsg} />
            </div>
        </div>
    );
}
