import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-light leading-snug">
          We’ve introduced our new&nbsp;
          <span className="text-primary font-semibold">AI Chatbot</span>
          &nbsp;just for you!
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600">
          Experience the future of fashion assistance with our cutting-edge AI.
          Your style, our innovation.
        </p>
        <Link href={"/chatbot"}>
          <div className="mt-8 inline-block px-6 py-3 text-white bg-primary rounded-lg text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-shadow">
            Try it now
          </div>
        </Link>
      </div>
    </div>
  );
}
