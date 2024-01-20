const Button = ({ children }: { children: any }) => (
  <button className="bg-blue-700 rounded-lg text-white px-4 py-2 font-semibold  hover:bg-blue-600">
    {children}
  </button>
);

export default Button;
