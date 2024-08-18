import { Navabar } from "@/components/Navabar";
import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <Navabar />
      <div className="min-h-screen">{children}</div>
    </div>
  );
}

