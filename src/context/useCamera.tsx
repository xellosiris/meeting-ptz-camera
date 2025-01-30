import type { Position, Speaker } from "@/type/speaker";
import type { Cam } from "onvif/promises";
import React from "react";
export type CameraContextType = {
  camera: Cam | null;
  cameraConnect: (hostname: string, port: number, username: string, password: string) => Promise<void>;
  getCameraPosition: () => Promise<Position>;
  moveCamera: (position: Position) => Promise<void>;
  cameraStop: () => Promise<void>;
  getPerson: () => Promise<Speaker[]>;
  setPerson: (person: Speaker) => Promise<void>;
  removePerson: (speaker: Speaker) => Promise<void>;
};

export const CameraContext = React.createContext<CameraContextType>({
  camera: null,
  cameraConnect: async () => {},
  getCameraPosition: async () => ({ x: 0, y: 0, zoom: 0 }),
  moveCamera: async () => {},
  cameraStop: async () => {},
  getPerson: async () => [],
  setPerson: async () => {},
  removePerson: async () => {},
});

export const useCamera = () => React.useContext(CameraContext);

export const CameraProvider = ({ children }: { children: React.ReactNode }) => {
  const [camera, setCamera] = React.useState<Cam | null>(null);

  const cameraConnect = async (hostname: string, port: number, username: string, password: string) => {
    const cam = await window.api.cameraConnect(hostname, port, username, password);
    if (!cam) throw new Error("攝影機未連線");
    setCamera(cam);
  };

  const getCameraPosition = async () => {
    if (!camera) throw new Error("攝影機未連線");
    return await window.api.getCameraPosition(camera);
  };

  const moveCamera = async (position: Position) => {
    if (!camera) throw new Error("攝影機未連線");
    await window.api.cameraMove(camera, position);
  };

  const cameraStop = async () => {
    if (!camera) throw new Error("攝影機未連線");
    await window.api.cameraStop(camera);
  };

  const getPerson = async () => {
    const data = await window.api.getPerson();
    return data;
  };

  const setPerson = async (person: Speaker) => {
    await window.api.setPerson(person);
  };

  const removePerson = async (speaker: Speaker) => {
    await window.api.removePerson(speaker);
  };

  return (
    <CameraContext.Provider
      value={{ camera, cameraConnect, getCameraPosition, moveCamera, cameraStop, getPerson, setPerson, removePerson }}
    >
      {children}
    </CameraContext.Provider>
  );
};
