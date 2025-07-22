"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-600 cursor-pointer transition-colors duration-200"
    >
      <span className="material-symbols-outlined">arrow_back</span> Back
    </button>
  );
}

export default BackButton;
