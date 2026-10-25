export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "Small on purpose",
    body: "A studio of a few people shipping real things. It keeps the work honest and the overhead low.",
  },
  {
    title: "Finish the thing",
    body: "An announced app is not a shipped app. We finish what we start, then we ship it.",
  },
  {
    title: "Own the whole stack",
    body: "Art, code, release, support. Fewer handoffs means fewer places for quality to disappear.",
  },
];
