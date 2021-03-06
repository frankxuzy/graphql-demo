import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'

import {getBooksQuery, getAuthorsQuery, addBookMutation} from '../queries/queries'

class AddBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      genre: "",
      authorid: ""
    }
  }
  displayAuthors = () => {
    const data = this.props.getAuthorsQuery
    if(data.loading) {
      return (<option>Loading Authors...</option>)
    } else {
      return (
        data.authors.map(author => {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          )
        })
      )
    }
  }
  submitForm = (e) => {
    e.preventDefault()
    this.props.addBookMutation({
      // variables object can pass variables into mutation
      variables:{...this.state},
      // trigger rerender the BookList component
      refetchQueries: [{query: getBooksQuery}]
    })
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange= {e => this.setState({name: e.target.value})} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange= {e => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange= {e => this.setState({authorid: e.target.value})}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>Submit</button>
      </form>
    )
  }
}


export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)