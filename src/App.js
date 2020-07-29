import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
import Header from "./Header/Header";
import HomePage from "./HomePage";
import RandomCatImage from "./Cats/RandomCatImage";
import RandomCatFacts from "./Cats/RandomCatFact";
import RandomDogImage from "./Dogs/RandomDogImage";
import "./App.css";

const MainContainer = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  display: flex;
`;

function App() {
  const [myTimer, setMyTimer] = React.useState(0);
  const updateTime = 30;


  const timerFunc = () => {
    myTimer > 0 && setTimeout(() => setMyTimer(myTimer - 1), 1000);
    if(myTimer===0) {
       
      setMyTimer(updateTime);
    }
  };

    React.useEffect(() => {
      timerFunc();
  }, [myTimer]);

  return (
    <MainContainer>
      <Header />
      <Router>
        <HomePage path="/" />
        <RandomCatImage path="/randomCat" timer={myTimer} />
        <RandomDogImage path="/randomDog" timer={myTimer} />
        <RandomCatFacts path="/catFacts" timer={myTimer} />
      </Router>
    </MainContainer>
  );
}

export default App;
