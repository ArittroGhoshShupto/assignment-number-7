export default function Loading() {
  return (
    <div className="mx-auto max-w-md animate-pulse space-y-4 px-4 py-12">
      <div className="mx-auto h-8 w-40 rounded bg-gray-200" />
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-emerald-200" />
      </div>
    </div>
  );
}