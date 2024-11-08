declare module 'formidable' {
  import { IncomingMessage } from 'http';

  interface File {
    filepath: string;
    originalFilename: string | null;
    newFilename: string;
    mimetype: string | null;
    size: number;
    lastModifiedDate?: Date;
    hash?: string;
  }

  interface Options {
    encoding?: string;
    uploadDir?: string;
    keepExtensions?: boolean;
    maxFileSize?: number;
    maxFieldsSize?: number;
    maxFields?: number;
    hash?: false | 'sha1' | 'md5' | 'sha256';
    multiples?: boolean;
    filter?: (part: { name: string; originalFilename: string | null; mimetype: string | null }) => boolean;
  }

  interface Fields {
    [key: string]: string[];
  }

  interface Files {
    [key: string]: File[];
  }

  interface Formidable {
    parse(req: IncomingMessage): Promise<[Fields, Files]>;
  }

  function formidable(options?: Options): Formidable;

  export = formidable;
} 