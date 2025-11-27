/**
 * Minimal declarations to confirm TypeScript presence to Expo and speed up TS scanning.
 */

/* Allow importing JSON and image assets without type errors */
declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
