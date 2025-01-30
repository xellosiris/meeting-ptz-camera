import ManageDialog from "@/components/EditDialog";
import { useCamera } from "@/context/useCamera";
import { useToast } from "@/hooks/use-toast";
import type { Speaker } from "@/type/speaker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";

type Props = {
  speaker: Speaker;
};

export default function User({ speaker }: Props) {
  const { name, left, center, right } = speaker;
  const [obj, setObj] = React.useState<Speaker | null | undefined>();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { removePerson } = useCamera();
  const onEdit = () => {
    setObj(speaker);
  };
  const onClose = () => {
    setObj(undefined);
  };
  const onDeleteMutation = useMutation({
    mutationFn: () => removePerson(speaker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["speakers"] });
      toast({
        title: "成功",
        description: `已刪除：${name}`,
      });
    },
    onError: (error) => {
      toast({
        title: "失敗",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => onClose(),
  });
  return (
    <Card className="w-[250px] p-3">
      <CardHeader className="py-1">
        <h1 className="text-lg font-semibold">{name}</h1>
      </CardHeader>
      <CardContent className="py-1 space-y-2">
        <div className="flex items-center gap-5">
          <Label>左側</Label>
          {!left && <div className="text-xs text-destructive">未設定</div>}
          {left && (
            <div>
              <div className="text-xs">x：{left.x}</div>
              <div className="text-xs">y：{left.y}</div>
              <div className="text-xs">zoom：{left.zoom}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Label>中間</Label>
          {!center && <div className="text-xs text-destructive">未設定</div>}
          {center && (
            <div>
              <div className="text-xs">x：{center.x}</div>
              <div className="text-xs">y：{center.y}</div>
              <div className="text-xs">zoom：{center.zoom}</div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Label>右側</Label>
          {!right && <div className="text-xs text-destructive">未設定</div>}
          {right && (
            <div>
              <div className="text-xs">x：{right.x}</div>
              <div className="text-xs">y：{right.y}</div>
              <div className="text-xs">zoom：{right.zoom}</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-0">
        <Button className="rounded-full" size="icon" variant={"ghost"} onClick={onEdit}>
          <Pen />
        </Button>
        <Button className="rounded-full" size="icon" variant={"ghost"} onClick={() => onDeleteMutation.mutate()}>
          <Trash className="text-destructive" />
        </Button>
      </CardFooter>
      {obj !== undefined && <ManageDialog obj={obj} onClose={onClose} />}
    </Card>
  );
}
