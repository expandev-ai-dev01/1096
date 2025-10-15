/**
 * @summary
 * Database utility functions
 *
 * @module utils/database
 */

import sql from 'mssql';
import { config } from '@/config';

/**
 * @enum ExpectedReturn
 * @description Expected return types from database operations
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @summary
 * Database connection pool
 */
let pool: sql.ConnectionPool | null = null;

/**
 * @summary
 * Get database connection pool
 *
 * @function getPool
 * @module utils/database
 *
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 *
 * @throws {Error} When connection fails
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config.database);
  }
  return pool;
}

/**
 * @summary
 * Execute database stored procedure
 *
 * @function dbRequest
 * @module utils/database
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} [transaction] - Optional transaction
 * @param {string[]} [resultSetNames] - Optional result set names
 *
 * @returns {Promise<any>} Database operation result
 *
 * @throws {Error} When database operation fails
 *
 * @example
 * const result = await dbRequest(
 *   '[schema].[spProcedure]',
 *   { id: 1 },
 *   ExpectedReturn.Single
 * );
 */
export async function dbRequest(
  routine: string,
  parameters: any,
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  try {
    const currentPool = await getPool();
    const request = transaction ? new sql.Request(transaction) : new sql.Request(currentPool);

    Object.keys(parameters).forEach((key) => {
      request.input(key, parameters[key]);
    });

    const result = await request.execute(routine);

    switch (expectedReturn) {
      case ExpectedReturn.Single:
        return result.recordset[0];
      case ExpectedReturn.Multi:
        if (resultSetNames && resultSetNames.length > 0) {
          const namedResults: any = {};
          resultSetNames.forEach((name, index) => {
            namedResults[name] = result.recordsets[index];
          });
          return namedResults;
        }
        return result.recordsets;
      case ExpectedReturn.None:
        return null;
      default:
        return result.recordset;
    }
  } catch (error: any) {
    console.error('Database error:', {
      routine,
      error: error.message,
      parameters,
    });
    throw error;
  }
}

/**
 * @summary
 * Begin database transaction
 *
 * @function beginTransaction
 * @module utils/database
 *
 * @returns {Promise<sql.Transaction>} Database transaction
 *
 * @throws {Error} When transaction creation fails
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  const currentPool = await getPool();
  const transaction = new sql.Transaction(currentPool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary
 * Commit database transaction
 *
 * @function commitTransaction
 * @module utils/database
 *
 * @param {sql.Transaction} transaction - Database transaction
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When commit fails
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary
 * Rollback database transaction
 *
 * @function rollbackTransaction
 * @module utils/database
 *
 * @param {sql.Transaction} transaction - Database transaction
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When rollback fails
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}
