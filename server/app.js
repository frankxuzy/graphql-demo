const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://seanxu:test321@ds125293.mlab.com:25293/gql-demo', {useNewUrlParser: true})
mongoose.connection.once('open', () => {
  console.log('connected to databse')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(5000, () => {
  console.log('Listening on port 5000')
})
