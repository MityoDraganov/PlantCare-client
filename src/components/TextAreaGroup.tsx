import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const TextAreaGroup = ({
  label,
  placeHolder,
  value,
  onChange,
  id,
  className,
  absoluteLabel
}: {
  label: string;
  placeHolder?: string;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: any;
  className?: string;
  absoluteLabel?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      <Label className={`${absoluteLabel ? "absolute -top-4" : ""}`}>{label}</Label>
      <Textarea
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`${!value ? "bg-muted" : ""} w-full`}
        id={id}
      />
    </div>
  );
};
