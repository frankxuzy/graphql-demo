import React, {Component} from 'react'
import {graphql} from 'react-apollo'

import {getAuthorsQuery} from '../queries/queries'

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
    const data = this.props.data
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
    console.log(this.state)
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

export default graphql(getAuthorsQuery)(AddBook)