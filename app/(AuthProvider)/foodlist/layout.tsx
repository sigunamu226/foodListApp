"use client";

import { Header } from "@/components/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const { currentUser, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
