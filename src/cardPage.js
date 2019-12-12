import React from 'react';
import './App.css';
import axios from 'axios';
import Autocomplete from './Autocomplete.js';
//import heroes from './data.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const privRoot = new axios.create({
  baseURL: "http://localhost:3000/private"
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
      reviewRating: 1,
      avg: 0,
      tempRatings: []
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
  getRatings = (count, sum) =>{
    // var num = 0;
    // var den = ratings.length;
    let result = 0;
    // for(var i = 0; i < count; i++){
    //   // if(ratings[i] == 1){
    //   //   num += 0;
    //   // }
    //   // else if(ratings[i] == 2){
    //   //   num+= 25;
    //   // }
    //   // else if(ratings[i] == 3){
    //   //   num+= 50;
    //   // }
    //   // else if(ratings[i] == 4){
    //   //   num+= 75;
    //   // }
    //   // else if(ratings[i] == 5){
    //   //   num+= 100;
    //   // }
    // }
     result = Math.round(sum/count); 
     result = result * 20;
    this.setState({avg:result});
  }
  handleViewMap = () => {
    console.log("hi");
    return (<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/view?zoom=17&center=35.9141,-79.0540&key=AIzaSyBD2pY0bUHkG05T6jCfQCa04QGomHQmtpk" allowfullscreen></iframe>)
    // AIzaSyBD2pY0bUHkG05T6jCfQCa04QGomHQmtpk
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
     <div className = "fullWidth">

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
<div className = "center">
<span >Filter Options</span> <br/>

<input id = "gf" type="checkbox" checked={this.state.gf} onChange={this.handleGfChange} />Gluten Free Options<br/>
<input id = "kosher" type="checkbox" checked={this.state.kosher} onChange={this.handleKosherChange}/>Kosher<br/>
<input id = "nut" type="checkbox" checked={this.state.nutAllergy} onChange={this.handleNutChange}/>Nut-Allergy Friendly<br/>
<input id = "vegan" type="checkbox"  checked={this.state.veganFriendly} onChange={this.handleVeganChange}/>Vegan Friendly<br></br>
<input onClick={this.handleFilterChange} className = "s" type="submit" value="Filter"/>
</div>
        </div>
    </div>
            )
};
call = ()=>{
  
}
getRatings = (rating,name) =>{
  console.log(name)
  
  privRoot.get('/restaurants/' + name + '/ratings',)
  .then(res => {
    console.log("get Rating")
    console.log(res.data.results)
    this.setState({tempRatings: res.data.result})
  })

  var num = 0;
  var den = this.state.tempRatings.length;
  for(var i = 0; i < this.state.tempRatings.length; i++){
    if(this.state.tempRatings[i] == 1){
      num += 0;
    }
    else if(this.state.tempRatings[i] == 2){
      num+= 25;
    }
    else if(this.state.tempRatings[i] == 3){
      num+= 50;
    }
    else if(this.state.tempRatings[i] == 4){
      num+= 75;
    }
    else if(this.state.tempRatings[i] == 5){
      num+= 100;
    }
  }
  const avg = Math.round(num/den); 
  console.log("calculated")
  console.log(avg)
  privRoot.post('/restaurants/' + name + '/avg', {
    "data": avg,
  })
    .then(res => {
      console.log("posted")
      console.log(res);
      console.log(res.data);
     
    })

}
setReviewButton(event) {
  //console.log(event.target.value)
  event.preventDefault();
  var target = event.target.value
  this.setState({
    reviewRating: target
  })

}
handleSubmitReview = event =>{
  event.preventDefault();
  
   console.log(this.state.reviewRating)
   console.log(event.target.value)
   var tempArray =[]
     privRoot.get('/restaurants/' + event.target.value + '/ratings', )
      .then(res => {
       
      
        tempArray = res.data.result;
        tempArray.push(this.state.reviewRating)
        this.setState({tempRatings: tempArray})
      
      })

  privRoot.post('/restaurants/' + event.target.value + '/ratings', {
    "data": this.state.tempRatings
 
  })
    .then(res => {
      console.log("posted")
      console.log(res.data);
     
    })
    this.setState({tempRatings: []})
 
   //this.getRatings(this.state.reviewRating,event.target.value)

}
  render() {
    return (
      <div>
        <div>
        <div className="card" >
  <div className="card-body">
    <div className = "card-text"> <h1 id = "center">{this.state.guest === true ? <span>You are a guest, please login
      to gain full access
    </span> : <span>You are logged in</span>}</h1></div>
  </div>
</div>
          
        </div>
        {this.renderHeroEditForm()}
        <div>
      {/* <h1>React Autocomplete Demo</h1> */}
      <section className="section">
      <div className="container">
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
      </section>
    </div>

        {Object.keys(this.state.heroCards).map((key, id) => (


<div id = "formCard" className = "card" key={id}> 
<div id = {this.state.heroCards[key].id}   >
   
   <h1 className = "title" >{this.state.heroCards[key].name}</h1>
   <br/>
   <h1 className = "subtitle" >{this.state.heroCards[key].address}</h1>
   <p > {this.state.heroCards[key].hours}</p>
   
   <img  src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>
   <div  key = {id} id = "formCard" className = "card">

<form  key = {id}>
          <span>Ratings:</span><progress className="progress is-info" value={this.state.heroCards[key].avg} max="100" data-text={this.state.heroCards[key].avg}>30</progress>
         < div >
<input type="radio" onChange={this.setReviewButton.bind(this)}value="1" name="gender"  /> 1
<input type="radio" onChange={this.setReviewButton.bind(this)} value="2" name="gender" /> 2
</div>
              <div className ="buttons is-centered">
                <button onClick ={this.handleSubmitReview.bind(this)}  className = "button is-link is-centered" type={this.state.heroCards[key].name} value={this.state.heroCards[key].name} name="submit">Submit Review</button>
              </div>
      </form>   
      </div>
</div>
</div>
))}
  </div>
  
    )
  }
  
}

export default cardPage;
