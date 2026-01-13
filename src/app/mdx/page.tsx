import { MdxPlayground } from "@/components/mdx/mdx-playground";

export default function MdxPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#eef5ff] to-[#fff8e6] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <MdxPlayground variant="full" />
      </div>
    </div>
  );
}
