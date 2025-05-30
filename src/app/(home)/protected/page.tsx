const ProtectedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Protected Page</h1>
      <p className="mt-4 text-gray-600">
        This page is protected and can only be accessed by authenticated users.
      </p>
    </div>
  );
};
export default ProtectedPage;
