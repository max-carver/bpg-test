import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

const FormError = ({ error }: { error: string }) => {
  return (
    <Alert variant="destructive">
      <AlertDescription className="flex items-center gap-2">
        <AlertCircleIcon className="size-5" />
        {error}
      </AlertDescription>
    </Alert>
  );
};

export default FormError;
