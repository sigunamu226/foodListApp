import { Spinner } from "@nextui-org/react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="lg" color="secondary" />
    </div>
  );
};
