export const InputLabel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <p className="mb-2 text-sm text-blue-9 font-medium">{label}</p>
      {children}
    </div>
  );
};
