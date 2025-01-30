import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";
import { cameraConnect, cameraMove, cameraStop, getCameraPosition, getPerson, removePerson, setPerson } from "./camera";

// Custom APIs for renderer
const api = {
  cameraConnect,
  getCameraPosition,
  cameraMove,
  cameraStop,
  getPerson,
  setPerson,
  removePerson,
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
