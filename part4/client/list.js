var Distance = require('geo-distance');
var sortJsonArray = require('sort-json-array');
const config = require('./staff_list.json');

var peopleCloseToWork = [];
var peopleFarFromWork = [];



var storyPark = {
  lat: -41.2920728,
  lon: 174.7748162
};

function returnArray(){

const fs = require('fs')
fs.readFile('./staff_list.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {


    const staff = JSON.parse(jsonString)
    //cycles through staff_list.json
    for (var i = 0; i < staff.staff.length; i++) {
      var name = staff.staff[i].name;

      //fetches longitude and latitude from staff_list.json
      var longitude = staff.staff[i].location.longitude;
      var latitude = staff.staff[i].location.latitude;
      //assigns coordernates to readable variable
      var coords = {
        lat: latitude,
        lon: longitude
      }

      //calculates distance between storyPark and the coordernates of the staff members
      var distanceFromWork = Distance.between(storyPark, coords);

      // if distance from work is smaller than 2km, add names of staff members to peopleCloseToWork Array
      if (distanceFromWork < Distance('2 km')) {
        // console.log('close '+ distanceFromWork.human_readable()+ ' ' +name);
        peopleCloseToWork.push(" " + name);

      }

      if (distanceFromWork > Distance('2 km')) {
        peopleFarFromWork.push(" " + name);
      }


    }

    //sorts both arrays
    resultClose=peopleCloseToWork.sort().toString();
    // resultfar=peopleFarFromWork.sort().toString();


    //logs both arrays, ordered
  console.log("Staff who live close to work: "+resultClose);
  // console.log("Staff who live far from work: "+resultfar);
    // console.log("people far "+peopleFarFromWork);

  } catch (err) {
    console.log('Error parsing JSON string:', err)
  }
})


}

returnArray();
