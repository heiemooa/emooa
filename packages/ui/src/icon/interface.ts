interface IconBaseProps extends React.HTMLProps<SVGSVGElement> {
  spin?: boolean;
  rotate?: number;
}

export interface IconProps<T extends string = string> extends IconBaseProps {
  type?: T;
}
