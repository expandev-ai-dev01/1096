/**
 * @summary
 * 404 Not Found middleware
 *
 * @module middleware/notFound
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @summary
 * Handles requests to undefined routes
 *
 * @function notFoundMiddleware
 * @module middleware/notFound
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {void}
 */
export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
  });
}
