var natureEl = document.getElementById("Nature");
var computerEl = document.getElementById("Computer");
var mathEl = document.getElementById("Math");
var generalEl = document.getElementById("General");
var gadgetEl = document.getElementById("Gadgets");
var vehicleEl = document.getElementById("Vehicles");
var sportEl = document.getElementById("Sport");
var historyEl = document.getElementById("History");
var categoryEl = document.getElementById("dropdown-content");
var containerEl = document.querySelector(".container");




var soundEl = document.getElementById("mute");
var playEl=document.getElementById("play");
var sound =soundEl.checked;
document.getElementById("dropdown-content").classList.remove("displayhidden");
document.getElementById("dropdown-content").classList.add("display");

playEl.addEventListener('click',(event) => { 
    // event.preventDefault();
    var sound = soundEl.checked;
    if (sound) { 
    localStorage.setItem('mute', true);
    } else { localStorage.setItem('mute', false);
    }
});

categoryEl.addEventListener('click',(event) => { 
    event.preventDefault();
    console.log(categoryEl);
    var category = event.target.id
    localStorage.setItem('category', category);
    // document.getElementById("dropdown-content").classList.remove("display");
    // document.getElementById("dropdown-content").classList.add("display-hidden");
    // document.getElementById("category").classList.remove("display");
    // document.getElementById("category").classList.add("display-hidden");


});
