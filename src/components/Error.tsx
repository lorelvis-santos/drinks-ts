import type { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return (
    <p className="p-3 bg-red-600 text-white font-bold text-center uppercase w-full rounded-lg focus:outline-none">
      {children}
    </p>
  );
}
