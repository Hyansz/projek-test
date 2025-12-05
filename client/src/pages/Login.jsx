import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function Login() {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("Admin123!");
    const [err, setErr] = useState(null);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiFetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            // server returns user in body; if admin -> navigate to admin dashboard
            if (data.user?.role === "admin") nav("/admin");
            else nav("/");
        } catch (err) {
            setErr(err.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl mb-4">Login</h2>
            {err && <div className="text-red-600 mb-2">{err}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="w-full p-2 border rounded"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="w-full p-2 border rounded"
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
