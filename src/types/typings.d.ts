declare module "*.svg" {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const content: any;
  export default content;
}

declare module "*.png";
