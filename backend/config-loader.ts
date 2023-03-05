export const configLoader = () => {
  return {
    port: process.env.PORT,
    database: {
      username: process.env.DATABASE_USERNAME
    },
    mongo: {
      uri: process.env.MONGO_URI
    },
    jwt: {
      secret: process.env.SECRET_JWT
    }
  }
}