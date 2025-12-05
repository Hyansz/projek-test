export default function ItemList({ items, refresh }) {
    const deleteItem = async (id) => {
        await fetch(`http://localhost:5000/api/items/${id}`, {
            method: "DELETE",
        });
        refresh();
    };

    return (
        <div className="w-full max-w-md bg-white shadow p-4 rounded-md">
            {items.map((i) => (
                <div key={i.id} className="flex justify-between py-2 border-b">
                    <span>{i.name}</span>
                    <button
                        onClick={() => deleteItem(i.id)}
                        className="text-red-600 text-sm"
                    >
                        Hapus
                    </button>
                </div>
            ))}
        </div>
    );
}
