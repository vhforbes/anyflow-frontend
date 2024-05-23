interface InputLabelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const InputLabel = ({ label, children, className }: InputLabelProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-sm text-blue-9 font-medium">{label}</p>
      {children}
    </div>
  );
};
