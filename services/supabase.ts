import { IFood } from "@/common/interfaces/food";
import { createClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

const supabaseUrl = "https://toekbfoleaizavmqxgav.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const getFoodData = async () => {
  const { data, error } = await supabase.from("Food").select("*");
  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data");
  }

  const foodData = data as IFood[];
  return foodData;
};

export const saveFood = async (food: IFood, router: AppRouterInstance) => {
  food.created_at = new Date().toISOString().toLocaleString();
  const { error } = await supabase.from("Food").insert(food);
  if (error) {
    throw error;
  }
  router.push("/foodlist");
};

export const deleteFood = async (
  foodId: number,
  setFoods: React.Dispatch<SetStateAction<IFood[]>>
) => {
  const { error } = await supabase.from("Food").delete().eq("id", foodId);

  if (error) {
    throw error;
  }

  setFoods(await getFoodData());
};
