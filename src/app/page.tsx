import Posts from "@/components/Posts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative p-6 bg-gradient-to-br from-black via-amber-500 to-black animate-gradient bg-[length:400%_400%]">
      <nav className="w-full mb-6 mx-auto bg-gray-800/5 backdrop-blur-lg sticky top-4 z-10 rounded-full ring-1 ring-amber-200/20 flex flex-row items-center justify-between">
        <a
          href="https://google.com/?q=COMINGSOON"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-start py-4 px-6 gap-3"
        >
          <Image
            src="/assets/images/coins-logo.png"
            alt="twocents app logo"
            width={48}
            height={48}
            className="w-12"
            priority
          />
          <h1 className="text-2xl font-bold text-white">twocents</h1>
        </a>
      </nav>
      <Posts />
    </div>
  );
}
