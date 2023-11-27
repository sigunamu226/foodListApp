import { IFood } from "@/common/interfaces/food";
import { createClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

const supabaseUrl = "https://toekbfoleaizavmqxgav.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey!);

export const login = async (
  email: string,
  password: string,
  router: AppRouterInstance
) => {
  if (!email || !password) {
    throw new Error("メールアドレス、パスワードは必須です。");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("ログインに失敗しました。");
  }

  router.replace("/foodlist");
};

export const logout = async (router: AppRouterInstance) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  router.push("/login");
};

export const getFoodData = async (): Promise<IFood[]> => {
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

export const getEditFood = async (foodId: number): Promise<IFood> => {
  const { data, error } = await supabase
    .from("Food")
    .select("*")
    .eq("id", foodId);

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data");
  }

  const foodData = data as IFood[];
  return foodData[0];
};

export const updateFood = async (food: IFood, router: AppRouterInstance) => {
  const { error } = await supabase.from("Food").update(food).eq("id", food.id);

  if (error) {
    throw error;
  }

  router.push("/foodlist");
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
