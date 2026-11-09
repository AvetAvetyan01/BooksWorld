export const Grade = {
  Great: 5,
  Good: 4,
  Normal: 3,
  Bad: 2,
  Worst: 1,
} as const;

export type Grade = (typeof Grade)[keyof typeof Grade];