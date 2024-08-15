

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const InputGroup = ({
  label,
  placeHolder,
  value,
  onChange,
  id,
  type,
  className,
  absoluteLabel
}: {
  label: string;
  placeHolder?: string;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: any;
  type?: string;
  className?: string;
  multiple?: boolean;
  absoluteLabel?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      <Label className={`${absoluteLabel ? "absolute -top-4" : ""}`}>{label}</Label>
      <Input
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`${!value ? "bg-muted" : ""} w-full`}
        id={id}
        type={type || "text"}
        multiple
      />
    </div>
  );
};