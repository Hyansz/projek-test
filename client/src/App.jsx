import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

export default function App() {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const res = await fetch("http://localhost:5000/api/items");
        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">MERN CRUD Minimalis</h1>
            <ItemForm refresh={fetchItems} />
            <ItemList items={items} refresh={fetchItems} />
        </div>
    );
}
