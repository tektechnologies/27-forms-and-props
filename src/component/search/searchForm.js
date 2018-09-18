import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <form onSubmit = {this.props.formSubmit}>
          <input id="sub" type='text' placeholder="Search"/>
          <input id="limit" type='text' placeholder="limit"/>
          <input type='submit' value='Submit'/>
        </form>

      </div>
    )
  }
}