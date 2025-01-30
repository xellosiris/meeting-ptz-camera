import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCamera } from "@/context/useCamera";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function Connect() {
  const { camera, cameraConnect } = useCamera();
  const { toast } = useToast();
  const [obj, setObj] = React.useState({
    hostname: "192.168.0.88",
    port: 80,
    username: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObj((obj) => ({
      ...obj,
      [e.target.name]: e.target.value,
    }));
  };

  const connectMutation = useMutation({
    mutationFn: () => cameraConnect(obj.hostname, obj.port, obj.username, obj.password),
    onSuccess: () => {
      toast({
        title: "連線成功",
        description: "已成功連線到攝影機",
      });
    },
    onError: (error) => {
      toast({
        title: "連線失敗",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });
  return (
    <div className="flex items-center justify-center size-full">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">連線攝影機</CardTitle>
              <CardDescription>輸入以下資訊連線到攝影機</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="hostname">攝影機IP</Label>
                  <Input name="hostname" id="hostname" value={obj.hostname} onChange={onChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="port">Port</Label>
                  <Input name="port" id="port" value={obj.port} onChange={onChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="username">使用者名稱</Label>
                  <Input name="username" id="username" value={obj.username} onChange={onChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password">密碼</Label>
                  <Input name="password" id="password" type="password" value={obj.password} onChange={onChange} />
                </div>
                <Button className={cn(camera && "bg-green-500")} onClick={() => connectMutation.mutate()}>
                  {!camera ? "連線" : "已連線"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
