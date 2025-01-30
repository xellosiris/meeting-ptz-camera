export type Position = { x: number; y: number; zoom: number };

export type Speaker = {
  id: string;
  name: string;
  left?: Position;
  center?: Position;
  right?: Position;
};
