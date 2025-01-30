import { Separator } from "@/components/ui/separator";

type Props = {
  label: string;
};

export default function SeparatorWithLabel({ label }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <Separator className="flex-1" />
    </div>
  );
}
