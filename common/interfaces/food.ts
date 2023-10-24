export interface IFood {
  id: number;
  user_id: string | null;
  name: string | null;
  rest_count: string | null;
  created_at: string | null;
  expiration_at: string | null;
}

export const foodColumns = ["名前", "残数", "賞味期限", "登録日時", "操作"];
