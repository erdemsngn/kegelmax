"use client";
import { useMemo } from "react";

const TR_MONTHS = [
  "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
  "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",
];

function daysLeftInMonth(d: Date) {
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return lastDay - d.getDate();
}

function totalMembers(d: Date) {
  // Lansman: 1 Ocak 2024 — her gün ~200 yeni kullanıcı
  const launch = new Date(2024, 0, 1);
  const days = Math.floor((d.getTime() - launch.getTime()) / 86_400_000);
  return Math.max(0, 250_000 + days * 200);
}

export default function UrgencyBar() {
  const { members, daysLeft, monthName } = useMemo(() => {
    const now = new Date();
    return {
      members:   totalMembers(now).toLocaleString("tr-TR"),
      daysLeft:  daysLeftInMonth(now),
      monthName: TR_MONTHS[now.getMonth()],
    };
  }, []);

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-[#C9A84C] max-w-[430px] mx-auto">
      <div className="flex items-center justify-between px-4 py-1.5 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-black text-[10px]">🔥</span>
          <p className="text-black text-[10px] font-black leading-tight whitespace-nowrap">
            {monthName} indirimi — <span className="underline">{daysLeft} gün kaldı</span>
          </p>
        </div>
        <p className="text-black text-[10px] font-bold whitespace-nowrap shrink-0">
          👥 {members} toplam üye
        </p>
      </div>
    </div>
  );
}
