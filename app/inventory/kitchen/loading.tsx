export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-gray-900"></div>
      <h1 className="text-3xl mt-4">Loading...</h1>
    </div>
  );
}