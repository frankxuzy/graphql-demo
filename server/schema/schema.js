const graphql = require('graphql')
const _ = require('lodash')
// const Book = require('../models/book')
// const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql

const books = [
  {name: 'bookA', genre: 'Fantasy', id: '1', authorid: '1'},
  {name: 'bookB', genre: 'Fanasy', id: '2', authorid: '2'},
  {name: 'bookC', genre: 'Sci-Fi', id: '3', authorid: '3'},
  {name: 'bookD', genre: 'Sci-Fi', id: '4', authorid: '2'},
  {name: 'bookE', genre: 'Sci-Fi', id: '5', authorid: '3'},
  {name: 'bookF', genre: 'Sci-Fi', id: '6', authorid: '3'}
]

const authors = [
  {name: 'authorA', age: 100, id: '1'},
  {name: 'authorB', age: 200, id: '2'},
  {name: 'authorC', age: 300, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return _.find(authors, {id: parent.authorid})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    age: {type: GraphQLInt},
    name: {type: GraphQLString},
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return _.filter(books, {authorid: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        // code to get data from db / other source
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
