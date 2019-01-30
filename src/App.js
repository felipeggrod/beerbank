import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import Navbar from './components/Navbar';
import Searchbox from './components/Searchbox';
import Display from './components/Display';
import Modal from './components/Modal';



class App extends Component {
  constructor() {
    super()
    this.state = {
        beerList: [], //list of beers to be displayed
        favoriteList: [],
        favoritePage: false,
        modalBeerId: 1,
        similarBeers: []//[{name:"n1"},{name:"n1"},{name:"n1"}]
    }
  }
  
  getBeerList = () => {// get a list of beers
    $.ajax({
      type:'GET',
      url:'https://api.punkapi.com/v2/beers',
      dataType: 'JSON',
      success: (data) => {
        this.setState({beerList: data});
        //console.log(data)
      }
    });
  }

  getBeerListByName = (event) => {// get a list beers of passing a name
    if (event.target.value === '') {//avoid empty beer name request
      this.getBeerList();
      return;
    }
    $.ajax({
      type:'GET',
      url:'https://api.punkapi.com/v2/beers?beer_name=' + event.target.value,
      dataType: 'JSON',
      success: (data) => {
        this.setState({beerList: data});
        //console.log(data)
      }
    });
  }

  getBeerFavorites = () => {// fill the beerList with only favorited beers
    let favoriteList = localStorage.getItem("Favorites");
    favoriteList = favoriteList.split(',').join('|');
    
    $.ajax({
      type:'GET',
      url:'https://api.punkapi.com/v2/beers?ids=' + favoriteList,
      dataType: 'JSON',
      success: (data) => {
        this.setState({beerList: data});
        this.setState({favoritePage: true});
        //console.log(data)
      }
    });
  }

  toggleFavorite = (favoriteId) => {//toggles a beer in and out of favoriteList
    //turn the string into an array
    let favoriteList = localStorage.getItem("Favorites");
    favoriteList = JSON.parse("[" + favoriteList + "]");

    //toggle favorite
    if(favoriteList.includes(favoriteId)) {
      favoriteList = favoriteList.filter( (item) => { 
        return item !== favoriteId
      });
    } else {
      favoriteList.push(favoriteId);
    }
    
    localStorage.setItem("Favorites", favoriteList);
    this.getFavoriteList();
  }

  getFavoriteList = () => { //inserts the favorites list from local storage to state
    if( localStorage.getItem("Favorites") === null) {
      localStorage.setItem("Favorites", []);
    }
    this.setState({ favoriteList: localStorage.getItem("Favorites") });
  }

  getBeersPaginated = (page) => {//fetches a given page of beers and concatenates it with beerList

    $.ajax({
      type:'GET',
      url:'https://api.punkapi.com/v2/beers?page=' + page,
      dataType: 'JSON',
      success: (data) => {
        this.setState({beerList: this.state.beerList.concat(data)});
        //console.log(data)
      }
    });
  }

  getBeersOnPageBottom = (getBeersPaginated) => {//checks when the users gets to the bottom of the page and fetches more beers
    var page = 2;
  
    $(window).scroll( () => {
      if($(window).scrollTop() + $(window).height() === $(document).height()) {
        //console.log("Bottom! page:" + page);
        if(this.state.favoritePage) {
          //console.log("favoritepage == true")
          return;
        }
        getBeersPaginated(page);
        page++;
      }
    });
    
  }
  
  setModalBeerId = (id) => { //changes the modalBeerId state to the one of a clicked beer
    this.setState({ modalBeerId: id });
    this.getSimilarBeers(id);
  }

  findBeerWithId(id) {
    let beer = this.state.beerList.find( beer => beer.id === id)

    return beer;
  }

  getSimilarBeers = (id) => { //receives one ID, changes similarBeers to 3 beer elements
    let id1 = id + 1;
    let id2 = id + 2;
    let id3 = id + 3;
    
    let similarBeers = id1 + "|" + id2 + "|"+ id3;

    $.ajax({
      type:'GET',
      url:'https://api.punkapi.com/v2/beers?ids=' + similarBeers,
      dataType: 'JSON',
      success: (data) => {
        console.log(data);
        this.setState({similarBeers: data});
      }
    });
  }

  componentWillMount() {
    this.getSimilarBeers(1);
  }

  componentDidMount() {
    this.getBeerList();
    this.getFavoriteList();
    this.getBeersOnPageBottom(this.getBeersPaginated);
    
    
  }  

  render() {
    
    return (
      <div className="App">
        <Navbar getBeerFavorites = {this.getBeerFavorites}/>
        
        <Searchbox getBeerListByName = {this.getBeerListByName}/>
        
        <Display beerList = {this.state.beerList} toggleFavorite = {this.toggleFavorite} setModalBeerId = {this.setModalBeerId} />

        <Modal beer = { this.findBeerWithId(this.state.modalBeerId)} similarBeers = {this.state.similarBeers} />
              
      </div>
    );
  }
}

export default App;
