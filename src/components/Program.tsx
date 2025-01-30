import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCamera } from "@/context/useCamera";
import { useSchedule } from "@/context/useSchedule";
import { useToast } from "@/hooks/use-toast";
import type { Schedule } from "@/type/schedule";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  label: string;
  stageLeft?: boolean;
  stageCenter?: boolean;
  stageRight?: boolean;
  type: keyof Schedule;
};

export default function Program({ label, stageLeft = false, stageCenter = false, stageRight = false, type }: Props) {
  const { schedule, setSchedule } = useSchedule();
  const { toast } = useToast();
  const { moveCamera, getPerson } = useCamera();
  const { data: speakers, isLoading } = useQuery({
    queryKey: ["speakers"],
    queryFn: getPerson,
  });
  const isUnSet = (p: "left" | "center" | "right") => {
    return !speakers?.find((speaker) => speaker.id === schedule[type])?.[p];
  };
  const moveMutation = useMutation({
    mutationFn: (p: "left" | "center" | "right") => {
      const speaker = speakers?.find((speaker) => speaker.id === schedule[type]);
      if (!speaker) throw new Error("找不到講者");
      if (!speaker[p]) throw new Error("講者未設定位置");
      return moveCamera(speaker[p]);
    },
    onError: (error) => {
      toast({
        title: "失敗",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const onValueChange = (value: string) => {
    setSchedule((pre) => ({ ...pre, [type]: value }));
  };
  if (isLoading) return <p className="text-muted-foreground">等待中...</p>;
  if (!speakers) return <p className="text-muted-foreground">請先新增講者名單</p>;

  return (
    <div className="flex items-center gap-x-5">
      <Label>{label}</Label>
      <Select value={schedule[type]} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="選擇..." />
        </SelectTrigger>
        <SelectContent>
          {speakers.map((candidate) => (
            <SelectItem key={candidate.name} value={candidate.id}>
              {candidate.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {stageLeft && (
        <Button
          className="h-8 disabled:opacity-20"
          disabled={!schedule[type] || isUnSet("left")}
          onClick={() => moveMutation.mutate("left")}
        >
          左側
        </Button>
      )}
      {stageCenter && (
        <Button
          className="h-8 disabled:opacity-20"
          disabled={!schedule[type] || isUnSet("center")}
          onClick={() => moveMutation.mutate("center")}
        >
          中間
        </Button>
      )}
      {stageRight && (
        <Button
          className="h-8 disabled:opacity-20"
          disabled={!schedule[type] || isUnSet("right")}
          onClick={() => moveMutation.mutate("right")}
        >
          右側
        </Button>
      )}
    </div>
  );
}
