import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", price: "" });
    const [editProduct, setEditProduct] = useState(null); // <-- modal state
    const nav = useNavigate();

    const loadProducts = () =>
        apiFetch("/api/products").then(setProducts).catch(console.error);

    useEffect(() => {
        apiFetch("/api/auth/me")
            .then((res) => {
                if (!res.user || res.user.role !== "admin") nav("/login");
                else setUser(res.user);
            })
            .catch(() => nav("/login"));

        loadProducts();
    }, []);

    // Format angka ribuan (10000 → 10.000)
    const formatNumber = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Deteksi input harga
    const handlePriceInput = (e) => {
        const raw = e.target.value.replace(/\D/g, "");
        setForm({ ...form, price: formatNumber(raw) });
    };

    const create = async (e) => {
        e.preventDefault();
        try {
            const cleanPrice = Number(form.price.replace(/\./g, ""));
            await apiFetch("/api/products", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    price: cleanPrice,
                }),
            });

            setForm({ title: "", description: "", price: "" });
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const update = async () => {
        const cleanPrice = Number(editProduct.price.replace(/\./g, ""));

        await apiFetch(`/api/products/${editProduct._id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: editProduct.title,
                description: editProduct.description,
                price: cleanPrice,
            }),
        });

        setEditProduct(null);
        loadProducts();
    };

    const del = async (id) => {
        if (!confirm("Delete?")) return;
        await apiFetch(`/api/products/${id}`, { method: "DELETE" });
        loadProducts();
    };

    const logout = async () => {
        await apiFetch("/api/auth/logout", { method: "POST" });
        nav("/login");
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Admin Dashboard</h1>
                <div>
                    <span className="mr-4">Welcome, {user?.name}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* CREATE NEW PRODUCT */}
            <form
                onSubmit={create}
                className="mb-6 bg-white p-4 rounded shadow"
            >
                <h3 className="font-bold mb-2">Tambah Produk</h3>

                <input
                    className="w-full border p-2 mb-2"
                    value={form.title}
                    placeholder="Nama produk"
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                <input
                    className="w-full border p-2 mb-2"
                    value={form.description}
                    placeholder="Deskripsi"
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                <input
                    className="w-full border p-2 mb-2"
                    value={form.price}
                    placeholder="Harga"
                    onChange={handlePriceInput}
                />

                <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Create
                </button>
            </form>

            {/* PRODUCT LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                    <div key={p._id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{p.title}</h3>
                        <p>{p.description}</p>
                        <p>Rp {p.price.toLocaleString("id-ID")}</p>

                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() =>
                                    setEditProduct({
                                        ...p,
                                        price: formatNumber(p.price),
                                    })
                                }
                                className="px-2 py-1 bg-yellow-400 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => del(p._id)}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL EDIT PRODUK */}
            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Produk</h2>

                        <input
                            className="w-full border p-2 mb-3"
                            value={editProduct.title}
                            onChange={(e) =>
                                setEditProduct({
                                    ...editProduct,
                                    title: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="w-full border p-2 mb-3 h-20"
                            value={editProduct.description}
                            onChange={(e) =>
                                setEditProduct({
                                    ...editProduct,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>

                        <input
                            className="w-full border p-2 mb-4"
                            value={editProduct.price}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                setEditProduct({
                                    ...editProduct,
                                    price: formatNumber(raw),
                                });
                            }}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditProduct(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={update}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
