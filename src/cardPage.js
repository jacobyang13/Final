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
      guest: false,
      name: "",
      person:[],
      login: '0',
      heroCards: {},
      defaultHeroCards: {},
      filterCards:{},
      reviews:[],
      gf: false,
      kosher: false,
      nutAllergy: false,
      veganFriendly: false
    };

  }
  componentDidMount = () => {
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
handleSubmitReview = event =>{
  var x = document.getElementById("{this.state.heroCards[key].id}").value;
  this.setState({reviews: x});
}
render() {
    return (
      <div>
        {this.renderHeroEditForm()}
        {Object.keys(this.state.heroCards).map((key, id) => (


<div  key={id}> 
<div id = {this.state.heroCards[key].id}  className = "result" >
   
   <h1 className = "title" >{this.state.heroCards[key].name}</h1>
   <br/>
   <h1 className = "subtitle" >{this.state.heroCards[key].address}</h1>
   <p > {this.state.heroCards[key].hours}</p>
   
   <img  src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>
<<<<<<< HEAD
        <form>
=======
   <form onSubmit>
>>>>>>> 6df31cf4ecb35a3c20f0b8cbfc19ab627a8528ad
                  <span>Ratings:</span><progress class="progress is-info" value="50" max="100" data-text="50%">30</progress>
                  <p class= "button is-primary is-centered" id = {this.state.heroCards[key].id}>
                      <input id="r1" type="radio" name="star" value="5"></input><label for="r1">1&#9733;</label>
                      <input id="r2" type="radio" name="star" value="4"></input><label for="r2">2&#9733;</label>
                      <input id="r3" type="radio" name="star" value="3"></input><label for="r3">3&#9733;</label>
                      <input id="r4" type="radio" name="star" value="2"></input><label for="r4">4&#9733;</label>
                      <input id="r5" type="radio" name="star" value="1"></input><label for="r5">5&#9733;</label><br></br>
                  </p>
                      <div class ="buttons is-centered">
                        <button onClick={this.handleSubmitReview} class = "button is-link is-centered" type={this.state.heroCards[key].id} value="Submit Review" name="submit">Submit Review</button>
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
