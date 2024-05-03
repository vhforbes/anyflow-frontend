"use client";

import Image from "next/image";

const HeaderComponent = () => {
  return (
    <div className="flex items-center justify-between bg-base-300 h-20 px-10 shadow-primary shadow-lg">
      <div>
        {/* WHY IS THIS GIVING fetchPriority WARNING ? */}
        {/* <Image
          width={130}
          height={130}
          src="/anyflow-logo.png"
          alt="anyflow header logo"
        /> */}
      </div>
      <button className="btn btn-sm border-none hover:bg-opacity-70 btn-secondary bg-opacity-90 h-8">
        Sign In
      </button>
    </div>
  );
};

export default HeaderComponent;
