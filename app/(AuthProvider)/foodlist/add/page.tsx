"use client";
import { FormBody } from "@/components/FormBody";
import { initFood } from "@/services/food_form";

export default function Page() {
  return <FormBody isCreate food={initFood()} />;
}
