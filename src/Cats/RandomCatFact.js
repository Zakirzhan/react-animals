import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

//https://alexwohlbruck.github.io/cat-facts/docs/

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
 

function RandomCatFact(props) {
  const [catFact, setCatFact] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(false);

  const generateFact = () => {
    axios.get(`https://cat-fact.herokuapp.com/facts`)
    .then(res => {
      let cats_array = res.data.all;
      let randomCatFact = cats_array[Math.floor(Math.random() * Math.floor(cats_array.length))]
       setCatFact(randomCatFact);
      })

  }
  
  React.useEffect(() => {
      

   if( props.timer === 0) {
      generateFact()
     }
     
    if(!firstLoad ){
      generateFact()
      setFirstLoad(true);
     }
 },[props.timer,firstLoad]);

 

  if (catFact == null) return <div> Loading </div>;
  

  return (
    <MainContainer> 
      <p>{catFact['text']}</p>
      <div>New cat image will appear in {props.timer} seconds</div>
    </MainContainer>
  );
}

export default RandomCatFact;
