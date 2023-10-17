const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


// Store sensitive in4 to env var
const dotenv = require('dotenv')
dotenv.config()

//Import ApolloServer
const { ApolloServer } = require('apollo-server-express')

//Import typdefs and resolvers
const TypeDefs = require('./graphql/typeDefs')
const Resolvers = require('./graphql/resolvers/resolvers')

//Define Apollo Server
const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})
// Define Express Server
const app = express()
app.use(bodyParser.json())
app.use('*', cors())

//Add Express app as middleware to Apollo Server
server.start().then(() => {
    server.applyMiddleware({ app })
})


// mongoDB Atlas Connecting string
const mongoDb_URL = process.env.MONGODB_URL

// TODO - Replace Connection string here
mongoose.connect(mongoDb_URL, {})
    .then(success => {
        console.log('Success MongoDB connection');
        // return server.listen({ port: process.env.PORT })
    }).catch(e => {
        console.log('Error MongoDB connection');
    })


// Start listen
app.listen({ port: process.env.PORT }, () => {
    console.log(`\n🚦 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath} 🚦`);
})