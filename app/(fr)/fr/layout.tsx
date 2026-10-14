import type { ReactNode } from "react";
import type { Viewport } from "next";
import { PortfolioRoot } from "@/components/PortfolioFrame";
import { baseMetadata } from "@/lib/portfolio-seo";
export const metadata = baseMetadata;
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f6ef",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <PortfolioRoot locale="fr">{children}</PortfolioRoot>;
}
