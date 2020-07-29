import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

//https://alexwohlbruck.github.io/cat-facts/docs/

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
 

function RandomCatFact() {

  const [catFact, setCatFact] = React.useState(null);

  React.useEffect(() => {
   axios.get(`https://cat-fact.herokuapp.com/facts`)
      .then(res => {
        let cats_array = res.data.all;
        let randomCatFact = cats_array[Math.floor(Math.random() * Math.floor(cats_array.length))]
         setCatFact(randomCatFact);
        })
    }, []);

  if (catFact == null) return <div> Loading </div>;
  

  return (
    <MainContainer> 
    <div>
      <p>{catFact['text']}</p>
    </div> 
    </MainContainer>
  );
}

export default RandomCatFact;
