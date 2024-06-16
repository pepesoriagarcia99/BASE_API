import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv();
addFormats(ajv);

export const compile = (schema: JSONSchemaType<any>) => ajv.compile(schema);

// export const body = (schema: JSONSchemaType<any>) => (req: Request, res: Response, next: NextFunction) => {
//       const valid = schema(req.body);
//       if (!valid) {
//         return res.status(400).json({ errors: ajv.errorsText(schema.errors) });
//       }
//       next();
//     };
