// types/form.ts (or directly in your ContactForm.tsx)
export type Message = {
  type: "error" | "success";
  text: string;
} | null;
