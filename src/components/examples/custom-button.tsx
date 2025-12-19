export const CustomButton = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <button
    type="button"
    className="mb-4 px-2 py-1 rounded-md hover:scale-105 active:scale-95 transition-transform"
    style={{ backgroundColor: color || "orange", color: "white" }}
  >
    {children}
  </button>
);
