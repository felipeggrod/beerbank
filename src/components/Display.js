import React from 'react';
import Beer from './Beer';

export default class Display extends React.Component {
    render () {
        var beerListComponent = []
            for (var i = 0; i < this.props.beerList.length; i++){
                beerListComponent.push(<Beer 
                    key = {i} 
                    name = {this.props.beerList[i].name }
                    img = {this.props.beerList[i].image_url}
                    tagline = {this.props.beerList[i].tagline}
                    id = {this.props.beerList[i].id}
                    toggleFavorite = {this.props.toggleFavorite}
                    setModalBeerId = {this.props.setModalBeerId}
                />)
            }

        return (
            <div className= "mx-auto row col-12 col-lg-8 offset-lg-2" >
                        {beerListComponent} 
            </div>
        ); 
    
    }
}
