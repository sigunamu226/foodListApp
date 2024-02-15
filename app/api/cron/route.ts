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

  if (expiredFoods.length === 0) {
    return Response.json({ message: "期限切れの食品はありません" }); // 期限切れの食品がない場合にメッセージを含むレスポンスを返す
  }

  const messageText = expiredFoods
    .map((food, index) =>
      expiredFoods.length === index + 1
        ? `${food.name}が期限切れ😡`
        : `${food.name}と`
    )
    .join("");

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

  // fetchの結果がundefinedでないことを確認し、undefinedの場合はエラーレスポンスを返す
  if (!response) {
    return Response.json({ message: "外部APIからの応答がありません" });
  }

  const data = await response.json();

  return Response.json({ data });
}
