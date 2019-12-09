/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */
// let master_length = heroicData.length;
let updated_data = heroicData;



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    // 
    return `
    <div id ="${hero.id}" class = "result"  style="background-color:${hero.backgroundColor}; width: 40%;">
        
            <h class = "title" style="color:black; font-weight:bold">${hero.name}</h>
            <br>
            <h class = "subtitle" style = "color: blue;">${hero.address}</h>
            <p style = "color: white;"> ${hero.hours}</p>
            
            <img src=${hero.img} alt="Hero Image">
            <button editween="${hero.id}" class = "heroes" type="button" 
            style="background-color: white; font-size: 20px; border: 1px solid black; color: ${hero.color}; border-radius: 20%;";>Reviews</button>
        
            //
            
        </div>
        `
        ;
};


export const renderHeroEditForm = function () {

    return `<div class="filter">

    <span class = "title">Filter Options</span> <br>

    <input id = "gf" type="checkbox" >Gluten Free Options<br>
    <input id = "kosher" type="checkbox" >Kosher<br>
    <input id = "nut" type="checkbox">Nut-Allergy Friendly<br>
    <input id = "vegan" type="checkbox">Vegan Friendly<br><br>
    <input class = "s" type="submit" value="Filter">

        
            </div>`;
};



export const handleEditFormSubmit = function (event) {

    event.preventDefault();
    const $root = $('#root');
    $(".noresults").remove();
    
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
    if (document.getElementById("vegan").checked == true){
        updated_data = updated_data.filter(x => x.vegan == true);
    }
    
    updateDOM(updated_data);
};


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
    if (input_arr.length == 0) {
        $(".filter").append(`<p class="noresults">NO RESULTS, NARROW SEARCH</p>`);
    } else {
        for (let i = 0; i < input_arr.length; i++) {
            let t = renderHeroCard(input_arr[i]);
            $root.append(t);
        }
    }
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);

});

