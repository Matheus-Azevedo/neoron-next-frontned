import Image from "next/image";
import "./page.module.css";
import Link from "next/link";

export default function App() {
  return (
    <main className="flex h-screen bg-grayLight">
      {/* Seção da imagem */}
      <section className="w-1/2 h-full relative flex items-center justify-center">
        <h1 className="absolute top-4 left-4 text-white text-8xl font-bold z-10 italic">
          New Airlines
        </h1>
        <Image
          src="/photo-login.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>

      {/* Seção do formulário */}
      <section className="w-1/2 flex items-center justify-center">
        <form className="bg-white flex flex-col space-y-6 p-32 rounded-3xl shadow-lg w-8/12">
          <h1 className="text-grayLight text-6xl font-bold z-10 italic text-center">
            N-Air Access
          </h1>
          <label className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Usuário"
              className="bg-grayLight border border-grayLight p-6 rounded-full w-full outline-none"
            />
          </label>
          <label className="flex flex-col space-y-2">
            <input
              type="password"
              placeholder="Senha"
              className="bg-grayLight border border-grayLight p-6 rounded-full w-full outline-none"
            />
          </label>
          <Link href="/page/flight">
            <button className="bg-blue-500 text-white p-6 rounded-full hover:bg-blue-600 w-full">
              Log in
            </button>
          </Link>
        </form>
      </section>
    </main>
  );
}
