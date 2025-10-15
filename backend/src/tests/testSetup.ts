/**
 * @summary
 * Global test environment setup
 *
 * @module tests/testSetup
 */

import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

/**
 * @summary
 * Setup function executed before all tests
 */
beforeAll(async () => {
  // Global test setup
  console.log('Test environment initialized');
});

/**
 * @summary
 * Cleanup function executed after all tests
 */
afterAll(async () => {
  // Global test cleanup
  console.log('Test environment cleaned up');
});
