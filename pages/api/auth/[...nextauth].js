import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    verificationOptions: {
      algorithms: ["HS512"]
    }
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})
