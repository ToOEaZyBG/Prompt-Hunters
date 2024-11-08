declare module 'swagger-jsdoc' {
  interface Options {
    definition: {
      openapi: string;
      info: {
        title: string;
        version: string;
        description?: string;
      };
      servers?: Array<{
        url: string;
        description?: string;
      }>;
    };
    apis: string[];
  }

  function swaggerJsdoc(options: Options): any;
  export = swaggerJsdoc;
}

declare module 'swagger-ui-express' {
  import { Request, Response, NextFunction } from 'express';

  interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerOptions?: any;
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    isExplorer?: boolean;
    customCssUrl?: string;
    customJsUrl?: string;
  }

  function serve(swaggerDocument?: any): any[];
  function setup(swaggerDocument: any, opts?: SwaggerUiOptions): (req: Request, res: Response, next: NextFunction) => void;

  export { serve, setup };
} 