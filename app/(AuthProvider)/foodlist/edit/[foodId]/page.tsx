import { FormBody } from "@/components/FormBody";
import { getEditFood } from "@/services/supabase";

interface Props {
  params: {
    foodId: string;
  };
}

export default async function Page(props: Props): Promise<JSX.Element> {
  const food = await getEditFood(Number(props.params.foodId));
  return <FormBody food={food} />;
}
