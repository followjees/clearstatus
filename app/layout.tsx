import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "ClearStatus Legal | UAE Travel Ban & Legal Verification Services",
  description: "Fast, confidential legal verification for UAE & GCC.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
