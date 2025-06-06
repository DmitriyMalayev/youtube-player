"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: "Hello, World!" });
  return (
    <div className="flex items-center justify-center">
      Client component says {data?.greeting}
    </div>
  );
}
