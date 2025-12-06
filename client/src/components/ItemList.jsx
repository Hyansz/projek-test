export default function ItemList({
    items,
    refresh,
    setLoading,
    setStatusMsg,
    onEdit,
}) {
    const deleteItem = async (id) => {
        setLoading(true);
        setStatusMsg("Menghapus item...");

        await fetch(`https://projek-test.vercel.app/api/items/${id}`, {
            method: "DELETE",
        });

        await refresh();
        setStatusMsg("Item terhapus");
        setTimeout(() => setStatusMsg(""), 1500);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-md bg-white shadow-lg p-5 rounded-xl border border-gray-200">
            {items.map((i) => (
                <div
                    key={i._id}
                    className="flex justify-between items-center py-3 border-b last:border-b-0"
                >
                    <span className="text-gray-700">{i.name}</span>

                    <div className="flex gap-3">
                        <button
                            onClick={() => onEdit(i)}
                            className="text-blue-600 text-sm hover:underline cursor-pointer"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteItem(i._id)}
                            className="text-red-600 text-sm hover:underline cursor-pointer"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
