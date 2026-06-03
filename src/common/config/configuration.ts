const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);

  return value;
};

export default () => ({
  port: parseInt(getEnv('PORT'), 10),

  // ? info comment for temporary until implementing database
  //   database: {
  //     host: getEnv('DB_HOST'),
  //     port: parseInt(getEnv('DB_PORT'), 10),
  //     username: getEnv('DB_USER'),
  //     password: getEnv('DB_PASSWORD'),
  //     name: getEnv('DB_NAME'),
  //   },
});
