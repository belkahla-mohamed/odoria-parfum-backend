export default ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";

  return {
    connection: {
      client: "postgres",
      connection: isProduction
        ? {
            // 🔴 PRODUCTION (Railway / Cloud)
            connectionString: env("DATABASE_URL"),
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            // 🟢 LOCAL
            host: env("DATABASE_HOST"),
            port: env.int("DATABASE_PORT"),
            database: env("DATABASE_NAME"),
            user: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
            ssl: false,
          },
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
};
