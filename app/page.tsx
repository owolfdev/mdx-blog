import LoaderLink from "@/components/nav/loader-link";
import AbstractArt from "@/components/graphics/abstract-image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Welcome to <span className="gradient-text">MDX</span> Blog
      </h1>
      <p className="text-center">
        This is a simple blog built with Next.js and MDX.
      </p>
      <LoaderLink isButton={true} url="/blog">
        Start Reading
      </LoaderLink>
      <AbstractArt />
    </div>
  );
}
