export interface CopyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
  /**
   * @zh 自定义复制文本
   * @en Copy text
   */
  text?: string | (() => string | Promise<string>);
  /**
   * @zh hover 展示
   */
  hover?: boolean;
  /**
   * @zh 点击复制
   */
  onCopy?: (text: string, e: React.ClipboardEventHandler<HTMLDivElement>) => void;
  /**
   * @zh 自定义图标：[默认图标, 拷贝成功后的图标]
   */
  icon?: [React.ReactNode, React.ReactNode?];
}
