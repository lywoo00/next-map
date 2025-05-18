import "@/styles/globals.css";
import { NextProvider, NextLayout } from "./providers";
import { Metadata } from "next";
import AuthContext from "@/context/AuthContext";
export const metadata: Metadata = {
  title: "next map",
  description: "맛집 앱",
};

export default function DashboardLayout({
  children, //
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <NextProvider>
            <NextLayout>{children}</NextLayout>
          </NextProvider>
        </AuthContext>
      </body>
    </html>
  );
}
