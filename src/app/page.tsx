import Image from 'next/image';
import Link from 'next/link';

export default function AppPage() {
    return (
        <main className="flex h-screen bg-white">
            {/* Seção da imagem */}
            <section className="relative flex h-full w-1/2 items-center justify-center">
                <h1 className="absolute left-4 top-4 z-10 text-8xl font-bold italic text-white">
                    New Airlines
                </h1>
                <Image
                    src="/photo-login.jpg"
                    alt="Hero"
                    className="border-white"
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </section>

            {/* Seção do formulário */}
            <section className="flex w-1/2 items-center justify-center">
                <form className="flex w-8/12 flex-col space-y-6 rounded-3xl bg-white p-32 shadow-2xl drop-shadow-2xl">
                    <h1 className="z-10 text-center text-6xl font-bold italic text-gray-500">
                        N-Air Access
                    </h1>
                    <label className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Usuário"
                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                        />
                    </label>
                    <label className="flex flex-col space-y-2">
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                        />
                    </label>
                    <Link href="/page/flight">
                        <button className="w-full rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600">
                            Log in
                        </button>
                    </Link>
                </form>
            </section>
        </main>
    );
}
