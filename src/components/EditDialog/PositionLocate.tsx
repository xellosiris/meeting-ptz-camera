import type { Position } from "@/type/speaker";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type Props = {
  data: Position | undefined;
  type: "left" | "center" | "right";
  onSetPosition: (type: "left" | "center" | "right") => void;
};

const POSITION = {
  left: "左側",
  center: "中間",
  right: "右側",
};

export default function PositionLocate({ data, type, onSetPosition }: Props) {
  return (
    <div className="space-y-1 text-xs">
      <div className="space-x-5">
        <Label className="text-sm">{POSITION[type]}</Label>
        <Button className="h-6" onClick={() => onSetPosition(type)}>
          定位
        </Button>
      </div>
      {!data && <div className="text-destructive">未設定</div>}
      {data && (
        <div>
          <div>x：{data.x}</div>
          <div>y：{data.y}</div>
          <div>zoom：{data.zoom}</div>
        </div>
      )}
    </div>
  );
}
