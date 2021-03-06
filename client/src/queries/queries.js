import {gql} from 'apollo-boost'

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

export const getBookDetails = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

// passing query veriables using $, ! means cannot be null
export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!){
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`