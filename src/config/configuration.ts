/**
 * Conguration management
 */
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    fixer: process.env.FIXER_API,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
