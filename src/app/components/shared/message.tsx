import { X } from '@phosphor-icons/react';

interface MessageModalProps {
    closeModal: () => void;
    message: string;
}

export default function MessageModal({
    closeModal,
    message,
}: MessageModalProps) {
    return (
        <dialog className="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <section className="flex max-w-screen-md flex-col gap-4 rounded-3xl bg-white p-8 shadow-2xl drop-shadow-2xl">
                <h1 className="text-center text-6xl font-bold text-gray-500">
                    Aviso:
                </h1>
                <section className="flex flex-col items-center gap-2">
                    <section className="flex flex-col gap-2">
                        <h1 className="text-center text-4xl font-bold text-gray-500">
                            {message}
                        </h1>
                    </section>
                    <section className="flex flex-col gap-2">
                        <button
                            onClick={closeModal}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600"
                        >
                            <X size={32} />
                        </button>
                    </section>
                </section>
            </section>
        </dialog>
    );
}
