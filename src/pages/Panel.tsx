import Program from "@/components/Program";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SeparatorWithLabel from "@/components/ui/separator-with-label";
import { useCamera } from "@/context/useCamera";

export function Panel() {
  const { camera, cameraStop } = useCamera();
  if (!camera) return <p className="text-muted-foreground">請先連接攝影機...</p>;
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <Program label="主席" stageLeft stageCenter type="chairman" />
      <SeparatorWithLabel label="上帝話語的寶藏" />
      <Program label="演講" stageCenter type="tgw_talk" />
      <Program label="經文寶石" stageCenter type="gems" />
      <Program label="經文朗讀" stageCenter type="mwb_tgw_bread" />
      <SeparatorWithLabel label="用心準備傳道工作" />
      <Program label="節目1" stageLeft stageCenter stageRight type="mwb_ayf_part1" />
      <Program label="節目2" stageLeft stageCenter stageRight type="mwb_ayf_part2" />
      <Program label="節目3" stageLeft stageCenter stageRight type="mwb_ayf_part3" />
      <Program label="節目4" stageLeft stageCenter stageRight type="mwb_ayf_part4" />
      <SeparatorWithLabel label="基督徒的生活" />
      <Program label="節目1" stageCenter type="mwb_lc_part1" />
      <Program label="節目2" stageCenter type="mwb_lc_part2" />
      <Program label="會眾研經班/守望台-主持" stageCenter type="mwb_lc_cbs" />
      <Program label="會眾研經班/守望台-誦讀" stageLeft type="mwb_lc_cbs_reading" />
      <Separator />
      <Button variant={"destructive"} onClick={cameraStop}>
        停止
      </Button>
    </div>
  );
}
