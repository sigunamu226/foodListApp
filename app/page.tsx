"use client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          router.push("/foodlist");
        }
        router.push("/login");
      } catch (error) {
        console.error("Error checking session:", error);
      }
    })();
  }, [router]);

  return <LoadingSpinner />;
}
