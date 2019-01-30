import React from 'react';

export default class Navbar extends React.Component {
    render () {
        return (
            <nav className="nav fixed-top flex-row-reverse" style={{backgroundColor: "orange"}}>
                <span className="nav-link clickable" style={{color: "white"}} onClick={(e) => this.props.getBeerFavorites()}>FAVOURITE</span>
                <a className="nav-link active" style={{color: "white"}} href=".">HOME</a>
            </nav>
        )
    }
}