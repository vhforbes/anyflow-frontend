import Link from "next/link";

const FooterComponent = () => {
  return (
    <div className="flex justify-between items-end p-6 bg-blue-0 border-t-[1px] border-[#475467] text-blue-6 px-28 py-8">
      <div>
        <p>© 2077 Untitled UI. All rights reserved.</p>
      </div>

      <div className="flex justify-between h-full">
        <Link href={"/"} className="mr-4">
          Terms
        </Link>
        <Link href={"/"} className="mr-4">
          Privacy
        </Link>
        <Link href={"/"}>Cookies</Link>
      </div>
    </div>
  );
};

export default FooterComponent;
