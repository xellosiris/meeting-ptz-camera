import type { Position, Speaker } from "@/type/speaker";
import type { Onvif } from "@2bad/onvif";
import type { ElectronAPI } from "@electron-toolkit/preload";
declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      cameraConnect: (hostname: string, port: number, username: string, password: string) => Promise<Onvif>;
      getCameraPosition: (camId: string) => Promise<Position>;
      cameraMove: (camId: string, position: Position) => Promise<void>;
      cameraStop: (camId: string) => Promise<void>;
      getPerson: () => Promise<Speaker[]>;
      setPerson: (person: Speaker) => Promise<void>;
      removePerson: (speaker: Speaker) => Promise<void>;
    };
  }
}
