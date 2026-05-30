import bbb from "@/assets/badge-bbb.svg";
import angi from "@/assets/badge-angi.svg";
import phcc from "@/assets/badge-phcc.svg";

export function Badges() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2
          className="text-center text-4xl font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Badges
        </h2>

        <div className="flex flex-row items-center justify-center gap-2 sm:gap-[94px] max-w-5xl mx-auto px-2">
          <img
            src={bbb}
            alt="BBB Accredited Business"
            className="h-auto sm:h-24 w-auto max-w-[30%] sm:max-w-none object-contain shrink"
          />
          <img
            src={angi}
            alt="Angi Super Service Award"
            className="h-auto sm:h-[154px] w-auto max-w-[30%] sm:max-w-none object-contain shrink"
          />
          <img
            src={phcc}
            alt="PHCC Member"
            className="h-auto sm:h-[121px] w-auto max-w-[30%] sm:max-w-none object-contain shrink"
          />
        </div>
      </div>
    </section>
  );
}
