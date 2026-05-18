"use client";
import { useMemo } from "react";

const TR_MONTHS = [
  "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
  "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",
];

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

function daysLeftInMonth(d: Date) {
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return lastDay - d.getDate();
}

export default function UrgencyBar() {
  const { members, daysLeft, monthName } = useMemo(() => {
    const now = new Date();
    return {
      members:   (1400 + dayOfYear(now) * 23).toLocaleString("tr-TR"),
      daysLeft:  daysLeftInMonth(now),
      monthName: TR_MONTHS[now.getMonth()],
    };
  }, []);

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-[#C9A84C] max-w-[430px] mx-auto">
      <div className="flex items-center justify-between px-4 py-1.5 gap-2">
        {/* Sol — indirim */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-black text-[10px]">🔥</span>
          <p className="text-black text-[10px] font-black leading-tight whitespace-nowrap">
            {monthName} indirimi — <span className="underline">{daysLeft} gün kaldı</span>
          </p>
        </div>

        {/* Sağ — katılan kişi */}
        <p className="text-black text-[10px] font-bold whitespace-nowrap shrink-0">
          👥 {members} katıldı
        </p>
      </div>
    </div>
  );
}
