export type IAppenderLayoutMessage = {
  type: "message";
};

export type IAppenderLayoutBasic = {
  type: "basic";
};

export type IAppenderLayoutPattern = {
  type: "pattern";
  pattern: string;
};

export type IAppenderLayout =
  | IAppenderLayoutMessage
  | IAppenderLayoutBasic
  | IAppenderLayoutPattern;

export type IAppenderType = "console" | "stderr" | "stdout" | "file";

export type IAppenderFile = {
  type: "file";
  colour?: boolean;
  file: {
    // https://www.npmjs.com/package/streamroller
    filename?: string;
    maxSize?: number; // defaults to 0 - the size in bytes to trigger a rollover. If not specified or 0, then no log rolling will happen.
    numBackups?: number; // defaults to 1 - the number of old files to keep (excluding the hot file)
    options?: {
      encoding?: string; // defaults to 'utf8'
      mode?: number; // defaults to 0o600 (see https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_file_modes)
      flags?: string; // defaults to 'a' (see https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_file_system_flags)
      compress?: boolean; // defaults to false - compress the backup files using gzip (backup files will have .gz extension)
      keepFileExt?: boolean; // <boolean> - defaults to false - preserve the file extension when rotating log files (file.log becomes file.1.log instead of file.log.1).
      fileNameSep?: string; // defaults to '.' - the filename separator when rolling. e.g.: abc.log.1 or abc.1.log (keepFileExt)
    };
  };
  layout: IAppenderLayout;
};

export type IAppender =
  | IAppenderFile
  | {
      type: Exclude<"console" | "stderr" | "stdout", "file">;
      colour?: boolean;
      layout: IAppenderLayout;
    };
