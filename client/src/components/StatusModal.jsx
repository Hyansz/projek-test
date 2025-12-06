export default function StatusModal({ loading, message }) {
    if (!loading && !message) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-fadeIn">
            <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-center flex flex-col items-center gap-3">
                {loading && (
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                )}
                <p className="text-gray-700 text-sm">{message}</p>
            </div>
        </div>
    );
}
