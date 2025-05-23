import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="/logo.svg" alt="logo" width={50} height={50} />
      <p className="text-xl tracking-tight font-semibold">NueTube</p>
    </div>
  );
}
