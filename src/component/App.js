import React from 'react';
import List from './search/resultList';
import Search from './search/searchForm';
import superagent from 'superagent';

let redditAPI = `https://www.reddit.com/r`;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
      sub: null,
      limit: null,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate(){
    console.log('Updated __STATE__', this.state);
  }

  async componentDidMount(){
    console.log('Mounted __STATE__', this.state);
    const data = await (this.searchReddit(this.state));
    this.setState(Object.assign(...this.state, data));
  }

  async handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;
    console.log(target);
    //let sub = event.target.sub.value;
    //let limit = event.target.limit.value;
    let sub = document.getElementById('sub').value;
    let limit = document.getElementById('limit').value;
    console.log(sub, limit);
    this.setState({sub: sub, limit: limit});
    let topics = await this.searchReddit({sub, limit});
    this.setState({topics: topics});
    
  }

  async searchReddit(state){
    const page = await (this.fetchData(state));
    let topics = [];
    page.data.children.forEach(child =>{
      //map will not work here
      topics.push(child.data.title);
    });
    console.log(topics);
    return topics;
  }

  fetchData(state){
    console.log(state);
    console.log(`${redditAPI}/${state.sub}.json?limit=${state.limit}`)
    //path to reddit articles
    return superagent.get(`${redditAPI}/${state.sub}.json?limit=${state.limit}`)
      .then(result=>{
       // console.log(result.body.data.children[0].data.title);
        return result.body;
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <Search formSubmit={this.handleSubmit}/>
        <List topics={this.state.topics}/>
      </React.Fragment>
    );
  }
}
