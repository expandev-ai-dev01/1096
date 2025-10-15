/**
 * @summary
 * Zod validation utilities
 *
 * @module utils/zodValidation
 */

import { z } from 'zod';

/**
 * @summary
 * String validation with max length
 */
export const zString = z.string().min(1).max(255);

/**
 * @summary
 * Nullable string validation
 */
export const zNullableString = z.string().max(255).nullable();

/**
 * @summary
 * Name validation (max 100 characters)
 */
export const zName = z.string().min(1).max(100);

/**
 * @summary
 * Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary
 * Foreign key validation (positive integer)
 */
export const zFK = z.coerce.number().int().positive();

/**
 * @summary
 * Nullable foreign key validation
 */
export const zNullableFK = z.coerce.number().int().positive().nullable();

/**
 * @summary
 * Bit/Boolean validation (0 or 1)
 */
export const zBit = z.coerce.number().int().min(0).max(1);

/**
 * @summary
 * Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary
 * Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * @summary
 * Phone validation (optional format)
 */
export const zPhone = z.string().max(20).nullable();

/**
 * @summary
 * URL validation
 */
export const zUrl = z.string().url().max(500).nullable();
