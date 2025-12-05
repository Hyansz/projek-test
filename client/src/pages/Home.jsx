import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        apiFetch("/api/products").then(setProducts).catch(console.error);
    }, []);
    return (
        <div>
            <h1 className="text-2xl mb-4">Produk</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((p) => (
                    <div key={p._id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{p.title}</h3>
                        <p className="text-sm">{p.description}</p>
                        <p>Rp {p.price.toLocaleString("id-ID")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
