import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
`;

// https://docs.thecatapi.com/

function RandomCatImage() {
  const [catImageUrl, setCatImageUrl] = React.useState(null);
  const [myTimer, setMyTimer] = React.useState(0);
  const updateTime = 30;
 const generateImage = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCatImageUrl(data[0].url);
      });
  }

  React.useEffect(() => {
    myTimer > 0 && setTimeout(() => setMyTimer(myTimer - 1), 1000);
    if(myTimer===0) {
      
      generateImage()
      
      setMyTimer(updateTime);
    }
  },[myTimer]);

  if (catImageUrl == null) return <div> Loading </div>;


  return (
    <MainContainer>
      <Image src={catImageUrl} />
      <div>New cat image will appear in {myTimer} seconds</div>
    </MainContainer>
  );
}

export default RandomCatImage;
