import { IFood, foodColumns } from "@/common/interfaces/food";
import { DeleteIcon } from "@/common/logos/DeleteIcon";
import { timestampStringToLocaleDateString } from "@/common/time";
import { deleteFood } from "@/services/supabase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

interface IFoodListProps {
  foods: IFood[];
}

export const FoodList: React.FC<IFoodListProps> = (props) => {
  const [foods, setFoods] = useState<IFood[]>(props.foods);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold">食材在庫リスト</h1>
      <div className="text-right">
        <Link href="/foodlist/add">
          <Button>新規登録</Button>
        </Link>
      </div>
      <div className="mt-10">
        <Table aria-label="Example static collection table">
          <TableHeader>
            {foodColumns.map((column, i) => (
              <TableColumn key={i}>{column}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {foods.map((food) => {
              return (
                <TableRow key={food.id}>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>{food.rest_count}</TableCell>
                  <TableCell>
                    {timestampStringToLocaleDateString(food.expiration_at)}
                  </TableCell>
                  <TableCell>
                    {timestampStringToLocaleDateString(food.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Button
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        color="danger"
                        variant="ghost"
                        onClick={() => deleteFood(food.id, setFoods)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
