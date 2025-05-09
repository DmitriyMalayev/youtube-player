import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      <p>NueTube</p>
    </div>
  );
}
