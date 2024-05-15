export const InputLabel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <p className="mb-2 text-sm">{label}</p>
      {children}
    </div>
  );
};
