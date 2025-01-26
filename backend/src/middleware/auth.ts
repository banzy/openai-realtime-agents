import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  apiKey?: string;
}

export const validateApiKey = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required',
      message: 'Please provide a valid API key'
    });
  }

  // In a production environment, you would validate against a secure storage
  const isValidApiKey = process.env.API_KEY === apiKey;

  if (!isValidApiKey) {
    return res.status(403).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid'
    });
  }

  req.apiKey = apiKey as string;
  next();
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Auth Error:', err);
  
  return res.status(500).json({
    error: 'Authentication error',
    message: 'An error occurred during authentication'
  });
};