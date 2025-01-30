import { useCamera } from "@/context/useCamera";
import { useToast } from "@/hooks/use-toast";
import type { Speaker } from "@/type/speaker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { v4 } from "uuid";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import PositionLocate from "./PositionLocate";

type Props = {
  obj: Speaker | null;
  onClose: () => void;
};

export default function ManageDialog({ obj, onClose }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [data, setData] = React.useState(
    obj !== null
      ? { ...obj }
      : {
          id: v4(),
          name: "",
        },
  );
  const { setPerson, getCameraPosition } = useCamera();
  const onSetPosition = async (type: "left" | "center" | "right") => {
    try {
      const position = await getCameraPosition();
      setData((data) => ({ ...data, [type]: { x: position.x, y: position.y, zoom: position.zoom + 0.08 } }));
    } catch (e) {
      toast({
        title: "失敗",
        description: (e as Error).message,
        variant: "destructive",
      });
    }
  };
  const onSubmitMutation = useMutation({
    mutationFn: () => setPerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["speakers"] });
      toast({
        title: "成功",
        description: `${obj === null ? "已新增" : "已更新"}：${data.name}`,
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
    <Dialog open={obj !== undefined} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{obj === null ? "新增" : "編輯"}</DialogTitle>
          <DialogDescription>請先操作攝影機，然後按下「定位」儲存講者位置</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input value={data.name} onChange={(e) => setData((data) => ({ ...data, name: e.target.value }))} />
          <PositionLocate data={data.left} type="left" onSetPosition={onSetPosition} />
          <PositionLocate data={data.center} type="center" onSetPosition={onSetPosition} />
          <PositionLocate data={data.right} type="right" onSetPosition={onSetPosition} />
        </div>
        <DialogFooter>
          <Button
            disabled={
              data.left === undefined || data.center === undefined || data.right === undefined || data.name === ""
            }
            onClick={() => onSubmitMutation.mutate()}
          >
            儲存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
