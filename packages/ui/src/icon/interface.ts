interface IconBaseProps extends React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  spin?: boolean;
  rotate?: number;
}

export interface IconProps<T extends string = string> extends IconBaseProps {
  type?: T;
}

export interface CustomIconOptions {
  url?: string | string[];
  options?: Record<string, unknown>;
}
