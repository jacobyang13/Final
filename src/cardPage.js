import React from 'react';
import './App.css';
import axios from 'axios';
import Autocomplete from './Autocomplete.js';
//import heroes from './data.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
export class cardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true,
      name: "",
      person:[],
      login: '0',
      heroCards: {},
      defaultHeroCards: {},
      filterCards:{},
      ratings :[],
      gf: false,
      kosher: false,
      nutAllergy: false,
      veganFriendly: false,
      reviewRating: 0,
      avg: 0,
    };

  }
  componentDidMount = () => {
    this.setState({guest: this.props.guest})
    pubRoot.get('/restaurants')
    .then(res => {
      this.setState({
        heroCards: res.data.result,
        defaultHeroCards: res.data.result
      })
    })
  }
  getRatings = (ratings) =>{
    var num = 0;
    var den = ratings.length;
    for(var i = 0; i < ratings.length; i++){
      if(ratings[i] == 1){
        num += 0;
      }
      else if(ratings[i] == 2){
        num+= 25;
      }
      else if(ratings[i] == 3){
        num+= 50;
      }
      else if(ratings[i] == 4){
        num+= 75;
      }
      else if(ratings[i] == 5){
        num+= 100;
      }
    }
    var avg = Math.round(num/den); 
    this.setState({avg:avg});
  }
  handleViewMap = () => {
    console.log("hi");
    return (<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/view?zoom=17&center=35.9141,-79.0540&key=AIzaSyBD2pY0bUHkG05T6jCfQCa04QGomHQmtpk" allowfullscreen></iframe>)
  }

  handleGfChange = event => 
    this.setState({ gf: event.target.checked })
    handleKosherChange = event => 
    this.setState({kosher: event.target.checked })
    handleNutChange = event => 
    this.setState({nutAllergy: event.target.checked })
    handleVeganChange = event => 
    this.setState({veganFriendly: event.target.checked })
    
  
handleFilterChange  = event => {
    event.preventDefault();
    const hero = this.state.defaultHeroCards

    const checkGF = this.state.gf
    const checkKosher = this.state.kosher 
    const checkNut = this.state.nutAllergy
    const checkVegan = this.state.veganFriendly
    var heroFilter = this.state.defaultHeroCards
    if(!checkGF && !checkKosher && !checkNut && !checkVegan){
      heroFilter = this.state.defaultHeroCards
    }
    else{
      if(checkGF){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].gf === checkGF) {
            return hero[key]
          }
        });
      }
      
      if(checkKosher){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].kosher_options === checkKosher) {
            return hero[key]
          }
        });
      }
      if(checkNut){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].nut_friendly === checkNut) {
            return hero[key]
          }
        });
      }
      if(checkVegan){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].vegan === checkVegan) {
            return hero[key]
          }
        });
      }
      heroFilter = heroFilter.filter(function( element ) {
        return element !== undefined;
     });
    }
   

   
   this.setState({heroCards: heroFilter})
    
      
  }
  renderHeroEditForm = () => {

    return (
     <div>

       {/* <div class="field" id="searchbar">
        <div class ="control">
        <input class="input is-primary" type="text" placeholder="Search For Restaurants Here"></input>
        </div>
       </div>

<form autocomplete="off" action="/action_page.php">
  <div class="autocomplete">
    <input id="myInput" type="text" name="myCountry" placeholder="Country"></input>
  </div>
  <input type="submit"></input>
</form> */}


       
       
     <div className="filter">

<span className = "title">Filter Options</span> <br/>

<input id = "gf" type="checkbox" checked={this.state.gf} onChange={this.handleGfChange} />Gluten Free Options<br/>
<input id = "kosher" type="checkbox" checked={this.state.kosher} onChange={this.handleKosherChange}/>Kosher<br/>
<input id = "nut" type="checkbox" checked={this.state.nutAllergy} onChange={this.handleNutChange}/>Nut-Allergy Friendly<br/>
<input id = "vegan" type="checkbox"  checked={this.state.veganFriendly} onChange={this.handleVeganChange}/>Vegan Friendly<br></br>
<input onClick={this.handleFilterChange} className = "s" type="submit" value="Filter"/>
        </div>
    </div>
            )
};
setReviewButton(event) {
  this.setState({reviewRating: parseInt(event.target.value,10)})
}
handleSubmitReview = event =>{
  event.preventDefault();
  
  console.log(this.state.reviewRating)
  this.setState({
    ratings: this.state.ratings.concat(this.state.reviewRating)
  })
  this.getRatings(this.state.ratings)
 console.log(this.state.ratings)
}
  render() {
    return (
      <div>
        <div>
        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <div className = "card-text">{this.state.guest === false ? <span>You are a guest</span> : <span></span>}</div>
  </div>
</div>
          
        </div>
        {this.renderHeroEditForm()}
        <div>
      <h1>React Autocomplete Demo</h1>
      <h2>Start typing and experience the autocomplete wizardry!</h2>
      <Autocomplete
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}
      />
    </div>
        {Object.keys(this.state.heroCards).map((key, id) => (


<div  key={id}> 
<div id = {this.state.heroCards[key].id}  className = "result" >
   
   <h1 className = "title" >{this.state.heroCards[key].name}</h1>
   <br/>
   <h1 className = "subtitle" >{this.state.heroCards[key].address}</h1>
   <p > {this.state.heroCards[key].hours}</p>
   
   <img  src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>
        <form>
                  <span>Ratings:</span><progress className="progress is-info" value={this.state.avg} max="100" data-text={this.state.avg}>30</progress>
                  <p onChange={this.setReviewButton.bind(this)} className= "button is-primary is-centered" id = {this.state.heroCards[key].id}>
          
                      <input id="r1" type="radio" name="star" value="1"></input><label htmlFor="r1">1&#9733;</label>
                      <input id="r2" type="radio" name="star" value="2"></input><label htmlFor="r2">2&#9733;</label>
                      <input id="r3" type="radio" name="star" value="3"></input><label htmlFor="r3">3&#9733;</label>
                      <input id="r4" type="radio" name="star" value="4"></input><label htmlFor="r4">4&#9733;</label>
                      <input id="r5" type="radio" name="star" value="5"></input><label htmlFor="r5">5&#9733;</label><br></br>
                  
                  </p>
                      <div className ="buttons is-centered">
                        <button onClick={this.handleSubmitReview} className = "button is-link is-centered" type={this.state.heroCards[key].id} value="Submit Review" name="submit">Submit Review</button>
                      </div>
              </form>   
</div>
</div>
       


))}
      
      </div>
    )
  }
  
}

export default cardPage;
