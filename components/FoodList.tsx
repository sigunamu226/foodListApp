import { IFood, foodColumns } from "@/common/interfaces/food";
import { DeleteIcon } from "@/common/logos/DeleteIcon";
import { EditIcon } from "@/common/logos/EditIcon";
import { timestampStringToLocaleDateString } from "@/common/time";
import { deleteFood } from "@/services/supabase";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface IFoodListProps {
  foods: IFood[];
}

export const FoodList: React.FC<IFoodListProps> = (props) => {
  const router = useRouter();
  const [foods, setFoods] = useState<IFood[]>(props.foods);
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const pages = Math.ceil(foods.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return foods.slice(start, end);
  }, [foods, page]);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold ml-4 md:ml-0">食材在庫リスト</h1>
      <div className="text-right mr-4 md:mr-0">
        <Link href="/foodlist/add">
          <Button>新規登録</Button>
        </Link>
      </div>
      <div className="mt-10 mx-2 md:mx-0">
        <Table
          aria-label="Example static collection table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            {foodColumns.map((column, i) => (
              <TableColumn key={i}>{column}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={items}>
            {(food) => {
              return (
                <TableRow key={food.id}>
                  <TableCell className="text-nowrap">{food.name}</TableCell>
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
                        className="text-lg text-success cursor-pointer active:opacity-50"
                        color="success"
                        variant="ghost"
                        onClick={() => router.push(`/foodlist/edit/${food.id}`)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        color="danger"
                        variant="ghost"
                        onClick={() =>
                          deleteFood(food.user_id!, food.id, setFoods)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
