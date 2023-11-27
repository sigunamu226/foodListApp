"use client";

import React, { Suspense, use } from "react";

import { FoodList } from "@/components/FoodList";
import { getFoodData } from "@/services/supabase";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Body: React.FC = () => {
  const foods = use(getFoodData());

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
