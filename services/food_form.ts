import { IFood } from "@/common/interfaces/food";

export const initFood = (): IFood => {
  return {
    id: Math.floor(Math.random() * 100000),
    user_id: "",
    name: "",
    rest_count: "",
    expiration_at: null,
    created_at: new Date().toISOString().toLocaleString(),
  };
};
