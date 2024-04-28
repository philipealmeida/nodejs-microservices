import helmet from 'helmet';
import { Express } from 'express';
import bodyParser from 'body-parser';
import { requestRateLimiter } from '@middlewares/security/requestRateLimiter';

const PAYLOAD_SIZE_LIMIT = '1mb';

/**
 * Applies various security-related middlewares to an Express application.
 *
 * @param {Express} app - The Express application to which the security middlewares will be applied.
 */
export const applySecurityMiddlewares = (app: Express): void => {
  // Protects the app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // Limits repeated requests to public APIs and/or endpoints such as password reset
  app.use(requestRateLimiter);

  // Parses incoming request payloads into a JSON object
  app.use(bodyParser.json({ limit: PAYLOAD_SIZE_LIMIT }));

  // Parses incoming requests with urlencoded payloads (only supports URL-encoded bodies)
  app.use(
    bodyParser.urlencoded({
      limit: PAYLOAD_SIZE_LIMIT,
      extended: false,
      parameterLimit: 5,
    })
  );
};
