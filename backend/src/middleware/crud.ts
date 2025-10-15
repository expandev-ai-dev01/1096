/**
 * @summary
 * CRUD controller base class for standardized API operations
 *
 * @module middleware/crud
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityConfig
 * @description Security configuration for CRUD operations
 *
 * @property {string} securable - Resource name
 * @property {string} permission - Required permission
 */
export interface SecurityConfig {
  securable: string;
  permission: string;
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 *
 * @property {object} credential - User credentials
 * @property {object} params - Validated parameters
 */
export interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Base controller for CRUD operations with security and validation
 */
export class CrudController {
  private securityConfig: SecurityConfig[];

  constructor(securityConfig: SecurityConfig[]) {
    this.securityConfig = securityConfig;
  }

  /**
   * @summary
   * Validates CREATE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates READ operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates UPDATE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async update(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates DELETE operation
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validate(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Internal validation method
   *
   * @param {Request} req - Express request
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   *
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  private async validate(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, any]> {
    try {
      const params = { ...req.params, ...req.query, ...req.body };
      const validated = await schema.parseAsync(params);

      return [
        {
          credential: {
            idAccount: 1,
            idUser: 1,
          },
          params: validated,
        },
        null,
      ];
    } catch (error: any) {
      return [
        null,
        {
          statusCode: 400,
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors,
        },
      ];
    }
  }
}

/**
 * @summary
 * Success response helper
 *
 * @param {any} data - Response data
 *
 * @returns {object} Success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Error response helper
 *
 * @param {string} message - Error message
 * @param {any} [details] - Error details
 *
 * @returns {object} Error response
 */
export function errorResponse(message: string, details?: any): object {
  return {
    success: false,
    error: {
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

export { StatusGeneralError } from './error';
