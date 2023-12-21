export type IAppenderLayout = "message" | "basic" | "colour" | "pattern";

export type IAppenderType = "console" | "stderr" | "stdout" | "file";

export interface IAppender {
  type: IAppenderType;
  layout: IAppenderLayout;
  filename?: string;
  pattern?: string;
}
