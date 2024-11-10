interface Props {
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Input({ id, name, className, value, onChange }: Props) {
  // TODO: Implement the input component
  return <input />;
}
