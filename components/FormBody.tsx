"use client";
import { IFood } from "@/common/interfaces/food";
import { AuthContext } from "@/providers/AuthProvider";
import { saveFood } from "@/services/supabase";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface IFormBodyProps {
  isCreate?: boolean;
  food: IFood;
}

export const FormBody: React.FC<IFormBodyProps> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [food, setFood] = useState<IFood>(props.food);

  const save = () => {
    saveFood(food, router, currentUser?.id!, props.isCreate);
  };

  return (
    <div className="container pl-6 md:mx-auto mt-10">
      <h1 className="text-3xl font-bold">
        {props.isCreate ? "食材登録" : "食材編集"}
      </h1>
      <div className="mt-12">
        <div className="w-2/3 md:w-6/12">
          <Input
            className="[&>label]:text-lg [&>label]:font-bold"
            type="text"
            value={food.name!}
            label="食材名"
            labelPlacement="outside"
            placeholder="食材名を入力"
            onChange={(e) => setFood({ ...food, name: e.target.value })}
          />
        </div>
        <div className="mt-12 w-2/3 md:w-6/12">
          <Input
            className="[&>label]:text-lg [&>label]:font-bold"
            type="text"
            value={food.rest_count!}
            label="残数"
            labelPlacement="outside"
            placeholder="残数を入力"
            onChange={(e) => setFood({ ...food, rest_count: e.target.value })}
          />
        </div>
        <div className="mt-12 w-2/3 md:w-6/12">
          <Input
            className="[&>label]:text-lg [&>label]:font-bold"
            type="date"
            label="賞味期限"
            labelPlacement="outside"
            placeholder="賞味期限を入力"
            value={new Date(food.expiration_at ?? "").toLocaleDateString(
              "sv-SE"
            )}
            onChange={(e) =>
              setFood({
                ...food,
                expiration_at: new Date(e.target.value)
                  .toISOString()
                  .toLocaleString(),
              })
            }
          />
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={save}>保存</Button>
        <Button
          className="ml-4"
          color="danger"
          variant="bordered"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>
    </div>
  );
};
