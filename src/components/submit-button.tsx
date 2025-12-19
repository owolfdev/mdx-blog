"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = Omit<ComponentProps<typeof Button>, "formAction"> & {
  pendingText?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
