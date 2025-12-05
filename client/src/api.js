const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiFetch(path, opts = {}) {
    const headers =
        opts.method === "GET" || !opts.method
            ? {}
            : { "Content-Type": "application/json" };

    const res = await fetch(API + path, {
        credentials: "include",
        headers,
        ...opts,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) throw data || { message: "Server error" };

    return data;
}
