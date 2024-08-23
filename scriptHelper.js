// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

  let missionTarget = document.getElementById("missionTarget")

  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`


                 
 }
 
 function validateInput(testInput) {
    // return either "Empty", "Not a Number", or "Is a Number"
    if (testInput.length == 0) {
      return "Empty";
    } else if (isNaN(testInput)) {
      return "Not a Number";
    } else if (!isNaN(testInput)) {
      return "Is a Number";
    }
 }

 
 
 function formSubmission(document,list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let faultyItems = list;
  let fuelStatus = document.getElementById("fuelStatus");
  let launchStatus = document.getElementById("launchStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  if (validateInput(pilot) === "Empty"  || validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
      event.preventDefault();
      alert("All fields are required!");
  } else if(validateInput(pilot) === "Is a Number"  || validateInput(copilot) === "Is a Number" ||
  validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    event.preventDefault();
    alert("Make sure to enter valid information for each field!");
  } else {

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;     
    
    launchStatus.innerHTML = `Shuttle is Ready for Launch`;
    launchStatus.style.color = "green";
    faultyItems.style.visibility = "visble";


    if (fuelLevel < 10000) {
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML = `Fuel level too low for launch`;
      launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
      launchStatus.style.color = "red";
    } else {
      fuelStatus.innerHTML = `Fuel level high enough for launch`;
    }

    if (cargoLevel > 10000 ) {
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
      launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
      launchStatus.style.color = "red";
    } else {
      cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }
  }
 }
 
 async function myFetch() {
 
     const planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json();
    }); 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
  // Uses random function
  let randomIndex = Math.random() * planets.length + 1;
  return planets[Math.floor(randomIndex)];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;