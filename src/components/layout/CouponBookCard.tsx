import { Link } from "@tanstack/react-router";
import { Ticket, CalendarCheck } from "lucide-react";

export function CouponBookCard() {
  return (
    <div className="flex items-stretch bg-[#A8C4FB] divide-x divide-[#1E3A6E]/20 rounded-bl-xl rounded-br-xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.28)]">
      <Link
        to="/coupons"
        className="flex items-center justify-center gap-2 px-4 pt-3.5 pb-[28px] text-[#1E3A6E] font-normal hover:bg-[#1E3A6E]/15 transition-colors duration-200 whitespace-nowrap text-[18px] rounded-bl-xl"
      >
        <Ticket className="size-5 shrink-0" />
        <span className="hidden sm:inline">Coupons</span>
      </Link>
      <a
        href="tel:+12067726077"
        className="flex items-center justify-center gap-2 px-4 pt-3.5 pb-[28px] text-[#1E3A6E] font-normal hover:bg-[#1E3A6E]/15 transition-colors duration-200 whitespace-nowrap text-[18px] rounded-br-xl"
      >
        <CalendarCheck className="size-5 shrink-0" />
        <span className="hidden sm:inline">Book Online Now</span>
      </a>
    </div>
  );
}
