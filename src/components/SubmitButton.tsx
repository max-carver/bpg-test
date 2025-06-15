import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "xl";
  isLoading?: boolean;
  isDisabled?: boolean;
  asChild?: boolean;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
}

const SubmitButton = ({
  onClick,
  variant = "default",
  size = "sm",
  isLoading,
  isDisabled,
  asChild,
  className,
  text,
  icon,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={isDisabled || isLoading}
      className={className}
      asChild={asChild}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" /> {text}
        </>
      ) : (
        <>
          {icon && icon}
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
