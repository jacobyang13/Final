import React from 'react';
import './App.css';
import axios from 'axios';
import heroes from './data.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/account"
});

export class cardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      person:[],
      login: '0',
      heroCards: []
    };

  }
  componentDidMount = () => {
     
  }

  handleViewMap = () => {
    console.log("hi");
    return (<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/view?zoom=17&center=35.9141,-79.0540&key=..." allowfullscreen></iframe>)
  }

  renderCards = () => {
  return (heroes.map((hero, id) => (


      <div>
      <div id = {hero.id}  className = "result" >
         
         <h1 className = "title" >{hero.name}</h1>
         <br/>
         <h1 className = "subtitle" >{hero.address} 
          <form onSubmit={this.handleViewMap}>
            <button type="submit">View Map</button>
          </form>
        </h1>
         
         <p > {hero.hours}</p>
         
         <img src= {hero.img} alt="Hero Image"/>
      
                    <form action="" method="post">
                      <p class="clasificacion">
                         <input id="r1" type="radio" name="estrellas" value="5"></input><label for="r1">&#9733;</label>
                         <input id="r2" type="radio" name="estrellas" value="4"></input><label for="r2">&#9733;</label>
                         <input id="r3" type="radio" name="estrellas" value="3"></input><label for="r3">&#9733;</label>
                         <input id="r4" type="radio" name="estrellas" value="2"></input><label for="r4">&#9733;</label>
                         <input id="r5" type="radio" name="estrellas" value="1"></input><label for="r5">&#9733;</label>
                      </p>
                      <p>
                        <input type="submit" value="submit" name="submit" />
                      </p>
                    </form>

     </div>
     </div>
             
    

  )));
  }
  renderHeroCard = (hero) => {

    
};
 
  renderHeroEditForm = () => {

    return (
     <div>
     <div class="filter">

<span class = "title">Filter Options</span> <br/>

<input id = "gf" type="checkbox" />Gluten Free Options<br/>
<input id = "kosher" type="checkbox" />Kosher<br/>
<input id = "nut" type="checkbox"/>Nut-Allergy Friendly<br/>
<input id = "vegan" type="checkbox"/>Vegan Friendly<br></br>
<input class = "s" type="submit" value="Filter"/>

        </div>
    </div>
            )
};

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  }
  
}

export default cardPage;
