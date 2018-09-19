import React from 'react';


export default class List extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='searchResults'>
                <ul>
                    {this.props.topics.map((topic, i) =>
                        <li key={i}>{topic}</li>
                        )}
                </ul>
            </div>
        );
    }





}