import React from 'react';
import List from './search/resultList';
import Search from './search/searchForm';
import superagent from 'superagent';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
      sub: 'nfl',
      limit: null,
    }
    this.redditAPI = `https://www.reddit.com/r/${this.state.sub}.json?limit=${this.state.limit}`;
    //this.loadTopics = this.loadTopics.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state);
  }

  async componentDidMount(){
    console.log('__STATE__', this.state);
    const data = await (this.searchReddit());
    this.setState(Object.assign(...this.state, data));
  }

  handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let sub = e.target.getElementById('sub').value;
    let limit = e.target.getElementById('limit').value;
    this.setState(Object.assign(...this.state, limit, sub));
    this.searchReddit();
  }

  async searchReddit(){
    const page = await (this.fetchData(this.redditAPI));
    let topicList = page.data;
    console.log(topicList);
    return {topicList};
  }

  fetchData(url){
    return superagent.get(url)
      .then(result=>{
        return result.body;
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <Search formSubmit={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}
