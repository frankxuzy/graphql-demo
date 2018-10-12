import React, { Component } from 'react'
import {compose, graphql} from 'react-apollo'

import {getBookDetails, getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBookId: null
    }
  }
  getBookDetails = (bookId) => {
    console.log(this.props.getBookDetails({
      variables:{id: bookId}
    }))
  }
  displayBooks = () => {
    const data = this.props.getBooksQuery
    if(data.loading){
      return (<div>Loading Books...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li 
            key={book.id} 
            onClick={
              e => this.setState({selectedBookId: book.id})
            }
          >
            {book.name}
          </li>
        )
      })
    }
  }
  render() {
    return (
      <div className="BookList">
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selectedBookId}/>
      </div>
    )
  }
}

// bind getBooksQuery to BookList, then inside BookList component, we can access getBooksQuery data from this.props.books
export default compose(
  graphql(getBooksQuery, {name: "getBooksQuery"}),
  graphql(getBookDetails, {name: "getBookDetails"})
)(BookList)