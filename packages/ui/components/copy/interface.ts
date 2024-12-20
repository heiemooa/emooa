export interface CopyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
  /**
   * @zh 自定义复制文本
   * @en Copy text
   */
  text?: string;
  /**
   * @zh hover 展示
   */
  hover?: boolean;
  /**
   * @zh 点击复制
   */
  onCopy?: (e: React.ClipboardEventHandler<HTMLDivElement>, data: string) => void;
}
