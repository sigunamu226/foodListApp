import { getFoodData } from "@/services/supabase";

const SUPABASE_USER_ID = process.env.SUPABASE_USER_ID!;
const lineApiEndpoint = "https://api.line.me/v2/bot/message/push";
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const toUserId = process.env.LINE_USER_ID!;

export async function GET() {
  const foods = await getFoodData(SUPABASE_USER_ID);
  const expiredFoods = foods.filter((food) => {
    if (!food.expiration_at) return false;
    return new Date(food.expiration_at) < new Date();
  });

  if (expiredFoods.length === 0) return;

  const messageText = expiredFoods
    .map((food) => `${food.name} が期限切れです`)
    .join("\n");

  const optionParams = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${channelAccessToken}`,
    },
    body: JSON.stringify({
      to: toUserId,
      messages: [{ type: "text", text: messageText }],
    }),
  };
  const response = await fetch(lineApiEndpoint, optionParams);
  const json = await response.json();

  return Response.json(json);
}
