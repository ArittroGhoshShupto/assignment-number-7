export default function Skeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse space-y-3 rounded-2xl bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-3 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-5 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-6 w-14 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}