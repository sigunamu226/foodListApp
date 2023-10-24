"use client";

import Header from "@/components/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
