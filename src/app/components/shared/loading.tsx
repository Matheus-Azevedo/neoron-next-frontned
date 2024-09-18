export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-white"></div>
                <p className="mt-4 text-lg font-semibold text-white">
                    Processando...
                </p>
            </div>
        </div>
    );
}
