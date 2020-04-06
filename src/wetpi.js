import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';
const Title = styled.h2`
text-align: center;
`
const Find = styled.button`
height: 0.8cm;
background-color: light-gray;
border: none;
`




function App() {
  return (
    <div>
      <div id="wetPIcont" class="container">
        <div class="row">
          <div class="col-lg-12">    
            <Title>
              WetPi
            </Title>              
            <div id="search"> 
              <select id="selectCity" placeholder="pick a city..">
              <option value="Pick a City">Pick a City</option>
              </select><Find>Show</Find>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
