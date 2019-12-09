/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */
let master_length = heroicData.length;
let updated_data = heroicData;



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `<div id="${hero.id}" tag = "${hero.id}" style="background-color:${hero.backgroundColor}; width: 40%;">
        <body>
            <span style="color:${hero.color};font-weight:bold">${hero.name}</span>
            
            <p style = "color: white;">${hero.first} ${hero.last}</p>
            <p style = "color: white;"> ${hero.description}</p>
            <p style = "color: white;"> First Seen: ${hero.firstSeen}</p>
            
            <img src=${hero.img} alt="Hero Image">
            <button editween="${hero.id}" class = "heroes" type="button" 
            style="background-color: white; font-size: 20px; border: 1px solid black; color: ${hero.color}; border-radius: 20%;";>Edit</button>
        </body>
        </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function () {
    // TODO: Copy your code from a04 to render the hero edit form


    return `<div id = "criteria" class="section">
    <form>
    <input id = "gf" type="checkbox" >Gluten Free Options<br>
    <input id = "kosher" type="checkbox" >Kosher Options<br>
    <input id = "nut" type="checkbox">Nut-Allergy Friendly<br><br>
    <input class = "s" type="submit" value="Submit">
  </form>
        
            </div>`;
};




/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {

    event.preventDefault();
    const $root = $('#root');

    
    
    for (let i = 0; i < updated_data.length; i++) {
        let curr_id = updated_data[i].id;
            let r = document.getElementById(curr_id.toString());
            r.remove();
    }

    updated_data = heroicData;
    if (document.getElementById("gf").checked == true) {
        updated_data = updated_data.filter(x => x.gf == true);
    }
    if (document.getElementById("kosher").checked == true) {
        updated_data = updated_data.filter(x => x.kosher_options == true);
    }
    if (document.getElementById("nut").checked == true) {
        updated_data = updated_data.filter(x => x.nut_friendly == true);
    }
    
    updateDOM(updated_data);
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    let x = renderHeroEditForm();
    $root.append(x);

    for (let i = 0; i < heroes.length; i++) {
        let t = renderHeroCard(heroes[i]);
        $root.append(t);
    }


    $root.on('click', '.s', handleEditFormSubmit);

};

export const updateDOM = function (input_arr) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for (let i = 0; i < input_arr.length; i++) {
        let t = renderHeroCard(input_arr[i]);
        $root.append(t);
    }

    // master_length = input_arr.length;

    // $root.on('click', '.s', handleEditFormSubmit);

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);

});
