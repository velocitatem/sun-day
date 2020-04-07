import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';
const Title = styled.h2`
text-align: left;
`
const Desc = styled.p`
padding: 0.5cm;
`
const Forecast = styled.p``
const Current = styled.p``
const Find = styled.button`
height: 0.8cm;
background-color: light-gray;
border-color: lightblue; 
border-style: solid;
border-left: none;

`
var selectedCity = ""
function cityAPI() {
  fetch("https://restcountries.eu/rest/v2/all")
  .then((response) => {
      return response.json();
  })
  .then((data) => {        
      console.log(data)
      var n
      for (n=0;n<data.length;n++) {
        if (data[n].capital !== "") {
          let opt = '<option value="'+data[n].capital+'">'+data[n].capital+'</option>'
          $("#selectCity").append(opt)
        }
        else {

        }
      }
  })
  .catch(err => {
      console.log(err);
  })
}

function fetchAPI() {
  console.log("selected: " +  $("#userCity").val())
  selectedCity = $("#userCity").val()
  fetchData(selectedCity) 
}

function showData(info) {
//countryDetails
$("#sep").show()
$("#sep1").show()

$("#city").html("City: "+info.location.name)
$("#country").html("Country: "+info.location.country)
$("#weatherStat").attr('src', info.current.condition.icon)
//current

$("#currentTemp").html("Temperature: "+info.current.temp_c+"°C")
$("#feellike").html("Feels like: "+info.current.feelslike_c+"°C")
$("#Condition").html("Condition: "+info.current.condition.text)
$("#windSpeed").html("Wind Speed: "+info.current.wind_kph+" kph")
$("#uvLevel").html("UV Level: "+info.current.uv)


}


function cast(data) {
console.log(data)
var d
$("#future").html("<hr></hr><center><h2>Forecast</h2></center>")
for(d=0;d<3;d++) {
  let code = `
  <h4>Date: ${data[d].date}</h4>
  <div class="row">
  <div class="col-sm-10">
  <p>Condition: ${data[d].day.condition.text} </p>
  <p>Maximum Temperature: ${data[d].day.maxtemp_c} </p>
  <p>Minimum Temperature: ${data[d].day.mintemp_c} </p> 
  <p>Average Temperature: ${data[d].day.avgtemp_c} </p>
  <p>Total Perciption: ${data[d].day.totalprecip_mm} </p>
  <p>Sunrise: ${data[d].astro.sunrise} </p>
  <p>Sunset: ${data[d].astro.sunset} </p>
  </div>
  <div class="col-sm-2">
  <img src="${data[d].day.condition.icon}"></img>
  </div>
  </div>
  


  <hr></hr>
  `
  $("#future").append(code)
}
}

function fetchData(city) {
    fetch("https://api.weatherapi.com/v1/forecast.json?key=d91c98c2f58449188f974510200604&q="+city+"&days=3")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
        showData(data)
        cast(data.forecast.forecastday)
    })
    .catch(err => {
        console.log(err);
        error()

    })
}

function error() {
alert("oops, something went wrong")
window.location.reload()
}

$(document).ready(function(){
  console.clear()
  cityAPI()
  $("#sep").hide()
  $("#sep1").hide()

})

function App() {
  return (
    <div>
      <div id="wetPIcont" class="container">
        <div class="row">
          <div class="col-lg-12">    
            <Title>
            🌞day
            </Title>              
              <div class="row">
                <div class="col-sm-4">
                  <Desc>
                    Welcome to sun-day. get weather conditions on almost any location in a matter of seconds
                  </Desc>
                </div>
                <div class="col-sm-4">
                <div id="search"> 
                <center>
                  <input type="text" id="userCity" list="selectCity" placeholder="pick a city..">
                  </input><Find id="find" onClick={fetchAPI}>Show</Find>
                </center>  
                <datalist id="selectCity">
                  </datalist>              
                 
              </div>
                </div>
                <div class="col-sm-4"></div>
                <hr id="sep1"></hr>  
              </div>
              <div id="data">
              <div id="abtC" class="container">               
              <div class="row">                             
                <div class="col-sm-5" id="abt">     
                <h2 id="city"></h2>             
                <p id="country"></p>
                </div>
                <div class="col-sm-7">
                  <center>
                    <img id="weatherStat"></img>  
                  </center>            
                </div>
              </div>
              <Current id="current">
                <div class="row">
                  <div class="col-sm-12">
                    <p id="currentTemp"></p>
                    <p id="feellike"></p>
                    <p id="Condition"></p>
                    <p id="windSpeed"></p>
                    <p id="uvLevel"></p>

                  </div>
                </div>
              </Current>
              <Forecast id="future">
                
              </Forecast>
            </div>
              </div>
              <p>
                  powered by
                    <a href="https://www.weatherapi.com">
                      <img id="apiS" src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png"></img>
                    </a>
                  </p>
          </div>        
        </div>
      </div>
    </div>
  );
}

export default App;
