import React from 'react';
import './App.css';
import axios from 'axios';
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
      reviewRating: ''


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
  
  this.setState({reviewRating: event.target.value})
}
handleSubmitReview = event =>{
  event.preventDefault();
  console.log(this.state.reviewRating)
  this.setState({
    ratings: this.state.ratings.concat(this.state.reviewRating)
  })
 console.log(this.state.ratings)
}
  render() {
    return (
      <div>
        <div>
         
          <div>You are a guest: <p>{this.state.guest === false ? <span>false</span> : <span>true</span>}</p></div>
        </div>
        {this.renderHeroEditForm()}
        {Object.keys(this.state.heroCards).map((key, id) => (


<div  key={id}> 
<div id = {this.state.heroCards[key].id}  className = "result" >
   
   <h1 className = "title" >{this.state.heroCards[key].name}</h1>
   <br/>
   <h1 className = "subtitle" >{this.state.heroCards[key].address}</h1>
   <p > {this.state.heroCards[key].hours}</p>
   
   <img  src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>
        <form>
                  <span>Ratings:</span><progress className="progress is-info" value="50" max="100" data-text="50%">30</progress>
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
