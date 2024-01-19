"use client";

import { FormBody } from "@/components/FormBody";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getEditFood } from "@/services/supabase";
import { Suspense, use } from "react";

interface IBodyProps {
  foodId: string;
}

const Body: React.FC<IBodyProps> = (props) => {
  const food = use(getEditFood(Number(props.foodId)));
  return <FormBody food={food} />;
};

interface Props {
  params: {
    foodId: string;
  };
}

export default function Page(props: Props): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Body foodId={props.params.foodId} />
    </Suspense>
  );
}
