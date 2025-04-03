export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <h2 className="text-xl font-semibold text-center mb-4">{children}</h2>
);

export const CardContent = ({ children }) => <div>{children}</div>;
