import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

function Footer() {
  return (
    <footer className="bottom-0 z-40 w-full bg-background ">
      <div className="sm:px-8 px-4 flex flex-col  items-center h-32 space-y-4 sm:space-y-4 font-light">
        <div className="flex gap-6 items-center pt-5">
          <div className="">&copy; {new Date().getFullYear()} website.com</div>
          <ThemeSwitcher />
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {/* <Link href="/blog">Blog</Link> */}
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

// import Link from "next/link";
// import { ThemeSwitcher } from "@/components/theme-switcher";

// function Footer() {
//   return (
//     <footer className="bottom-0 z-40 w-full border-t max-h-8 min-h-8 h-8">
//       <div className="sm:px-8 px-4 flex flex-col items-center h-32 space-y-4 ">
//         <div className="flex gap-6 items-center pt-8">
//           <div>&copy; {new Date().getFullYear()} website.com</div>{" "}
//           <ThemeSwitcher />
//         </div>
//         <nav className="flex gap-4 items-center">
//           <Link href="/">Home</Link>
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//           <Link href="/privacy">Privacy</Link>
//         </nav>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
