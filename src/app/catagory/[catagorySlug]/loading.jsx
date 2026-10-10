import Skeleton from "../../../components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1120px] px-4 py-8">
      <Skeleton count={6} />
    </div>
  );
}