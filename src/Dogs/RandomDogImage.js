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

function RandomDogImage(props) {
  const [dogImageUrl, setDogImageUrl] = React.useState(null);
  const [firstLoad, setFirstLoad] = React.useState(false);

  const generateImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDogImageUrl(data.message);
    });
  }


  React.useEffect(() => {
    if(props.timer===0) {
     
     generateImage()
     }

  
     if(!firstLoad ){
        generateImage()
        setFirstLoad(true);
       }
   },[props.timer,firstLoad]);

   
  if (dogImageUrl == null) return <div> Loading </div>;

  return (
    <MainContainer>
      <Image src={dogImageUrl} />
      <div>New Dog image will appear in {props.timer} seconds</div>
    </MainContainer>
  );
}

export default RandomDogImage;
