import React from 'react';

export default class Beer extends React.Component {   
    constructor() {
        super();
        this.state = {
            favoriteHover: false
        }
    }
    favoriteStar = () => {//change the icon and color if on favoriteList
        let favoriteList = localStorage.getItem("Favorites");
        favoriteList = JSON.parse("[" + favoriteList + "]");
        
        if ( favoriteList.includes(this.props.id) ) {
            return 'fa orange';
        } else {
            return 'far';
        }
    }
    render() {
        return (
            <div className="col-12 col-sm-6 col-lg-4" >
                <div 
                    onClick={ (e) => { if (this.state.favoriteHover === false) this.props.setModalBeerId(this.props.id) } } 
                    data-toggle= { (this.state.favoriteHover) ? "" : "modal" }
                    data-target= { (this.state.favoriteHover) ? "" : "#exampleModal"}
                    className="clickable shadow-box card m-3" 
                    style={{height: "20em", overflow: "auto"}}>

                    <span className="clickable" 
                        onClick={ (e) => { this.props.toggleFavorite(this.props.id)}}
                        onMouseEnter= { (e) =>{ this.setState({favoriteHover: true })} }
                        onMouseLeave= { (e) =>{ this.setState({favoriteHover: false})} }
                    >
                        <i className={ this.favoriteStar() + " fa-star m-2 top-right"} style={{ width: "20px"}}></i>
                    </span>

                    <img
                        className="card-img-top mx-auto d-block mt-3" 
                        style={{height: "50%", width: "auto"}} 
                        src={this.props.img} 
                        alt="Beer"
                    ></img>
                    
                   
                    <div className="card-body">
                        <h5 
                            className="card-title" 
                            style={{color: "orange"}}
                        > {this.props.name} </h5>
                        <p className="card-text text-secondary">{this.props.tagline}</p>
                    </div>
                </div>
            </div>
        );
    }
}