import Skeleton from "../components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-8 px-6 py-10">
      <Skeleton count={6} />
      <Skeleton count={6} />
    </div>
  );
}