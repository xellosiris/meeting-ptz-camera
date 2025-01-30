import type { Position, Speaker } from "@/type/speaker";
import fs from "node:fs";
import { Cam } from "onvif/promises";
import { v4 as uuid } from "uuid";
import speakerJson from "../../resources/speaker.json?commonjs-external&asset";
const CONNECTIONS = {};
export const cameraConnect = async (hostname: string, port: number, username: string, password: string) => {
  const cam = new Cam({
    username,
    password,
    hostname,
    port,
  });
  await cam.connect();

  const id = uuid();
  CONNECTIONS[id] = cam;
  return id;
};

export const getCameraPosition = async (camId: string) => {
  const status = await CONNECTIONS[camId].getStatus();
  return status.position;
};

export const cameraMove = async (camId: number, position: Position) => {
  await CONNECTIONS[camId].absoluteMove({ ...position, speed: { x: 1, y: 1, zoom: 1 } });
};

export const cameraStop = async (camId: number) => {
  await CONNECTIONS[camId].stop();
};

export const getPerson = async () => {
  try {
    const data = fs.readFileSync(speakerJson, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw new Error("找不到講者設定檔");
  }
};

export const setPerson = (speaker: Speaker) => {
  const jsonData = fs.readFileSync(speakerJson, "utf-8");
  const data = JSON.parse(jsonData);
  const person = data.find((s: Speaker) => s.id === speaker.id);
  if (!person) {
    data.push(speaker);
    fs.writeFileSync(speakerJson, JSON.stringify(data));
  } else {
    const index = data.indexOf(person);
    data[index] = speaker;
    fs.writeFileSync(speakerJson, JSON.stringify(data));
  }
};

export const removePerson = (speaker: Speaker) => {
  const jsonData = fs.readFileSync(speakerJson, "utf-8");
  const data = JSON.parse(jsonData);
  const removed = data.filter((s: Speaker) => s.id !== speaker.id);
  fs.writeFileSync(speakerJson, JSON.stringify(removed));
};
