import serverless from 'serverless-http';
import app from '../../server';

const expressHandler = serverless(app);

export const handler = (event: any, context: any) => {
  // Netlify redirects include the function prefix in the Lambda event path.
  event.path = event.path.replace(/^\/\.netlify\/functions\/api/, '');
  return expressHandler(event, context);
};
