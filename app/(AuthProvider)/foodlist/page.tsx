"use client";

import React, { Suspense, use, useContext } from "react";

import { FoodList } from "@/components/FoodList";
import { getFoodData } from "@/services/supabase";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AuthContext } from "@/providers/AuthProvider";

const Body: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const foods = use(getFoodData(currentUser?.id!));

  foods.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  return (
    <div className="container mx-auto">
      <FoodList foods={foods} />
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Body />
    </Suspense>
  );
}
