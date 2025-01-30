import ManageDialog from "@/components/EditDialog";
import User from "@/components/User";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCamera } from "@/context/useCamera";
import type { Speaker } from "@/type/speaker";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import React from "react";

export function Speakers() {
  const [obj, setObj] = React.useState<Speaker | null | undefined>();
  const onClose = () => {
    setObj(undefined);
  };
  const { camera, getPerson } = useCamera();
  const { data: speakers, isLoading } = useQuery({
    queryKey: ["speakers"],
    queryFn: getPerson,
  });
  if (isLoading) return <p className="text-muted-foreground">等待中...</p>;
  if (!speakers) throw new Error("找不到講者設定檔");
  if (!camera) return <p className="text-muted-foreground">請先連接攝影機...</p>;
  return (
    <div className="flex flex-wrap gap-3">
      {speakers.map((speaker) => (
        <User key={speaker.name} speaker={speaker} />
      ))}
      <Card className="w-[250px] flex items-center justify-center hover:cursor-pointer">
        <Button className="size-full" variant={"ghost"} onClick={() => setObj(null)}>
          <PlusCircle />
        </Button>
      </Card>
      {obj !== undefined && <ManageDialog obj={obj} onClose={onClose} />}
    </div>
  );
}
