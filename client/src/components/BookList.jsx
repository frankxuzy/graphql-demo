import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

class BookList extends Component {
  render() {
    return (
      <div className="BookList">
        <ul id="book-list">
          <li>Book name</li>
        </ul>
      </div>
    )
  }
}

// bind getBooksQuery to BookList, then inside BookList component, we can access getBooksQuery data from this.props.books
export default graphql(getBooksQuery)(BookList);
