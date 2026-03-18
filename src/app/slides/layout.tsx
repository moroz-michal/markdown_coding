import { ReactNode } from "react";

export default function SlidesLayout({ children }: { children: ReactNode }) {
  return <div className="flex h-screen overflow-hidden bg-background">{children}</div>;
}
