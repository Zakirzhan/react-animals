import React from "react";
import styled from "styled-components";
import axios from 'axios';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
`;

 

function CatBreeds(props) {
    const [catBreedsArray, setCatBreedsArray] = React.useState(null);
    const [catImage, setCatImage] = React.useState(null);

    
    const getBreeds = () => { 
        axios.get(`https://api.thecatapi.com/v1/breeds`)
        .then(res => {
            let mynewarray = res.data;
            setCatBreedsArray(mynewarray);
          })
    }


    const getCatImageByBreed = () => { 
        axios.get(`https://api.thecatapi.com/v1/images/search`)
        .then(res => {
            let image = res.data[0]['url'];
            setCatImage(image);
          })
    }
    
    const selectBreed = () => {
        getCatImageByBreed();
    }

    React.useEffect(() => {
        getBreeds()
    }, []);
    
    if (catBreedsArray == null) return <div> Loading </div>;

  return (
    <MainContainer> 
     <select  onChange={selectBreed}> {catBreedsArray.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select>

      <Image src={catImage} />

    </MainContainer>
  );
}
export default CatBreeds;
