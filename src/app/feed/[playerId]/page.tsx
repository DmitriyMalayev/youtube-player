interface PageProps {
  params: {
    playerId: string;
  };
}
const Page = async ({ params }: PageProps) => {
  // In Next.js 14, params needs to be awaited

  const { playerId } = await params;

  return (
    <div>
      <h1>Hello {playerId}!</h1>
    </div>
  );
};

export default Page;
