import React from 'react';

//same export as todays demo list
export default class List extends React.Component {
   //we need props to pass and populate the li
    constructor(props){
        super(props);
    }
    render(){
        console.log('About to render list', this.props);
        return(
            //div instead of form like the demo with search results
            //instead of pokemonList
            <div className='searchResults'>
                {/* <p htmlFor={this.state.title}>{this.state.title}</p> */}
                

                    {this.props.topics.map((topic, i) =>
                    <div key={i}>
                        <ul>
                            <li>{topic}</li>
                       </ul>
                    </div>
                        )}
                
            </div>
        );
    }





}