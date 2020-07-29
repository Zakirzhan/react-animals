import React from "react";
import styled from "styled-components";
import axios from 'axios';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CatDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  margin:10px;
`;

 

function CatBreeds(props) {
    const [catBreedsArray, setCatBreedsArray] = React.useState(null);
    const [catImage, setCatImage] = React.useState(null);
    const [catDescription, setCatDesc] = React.useState(null);

    
    const getBreeds = () => { 
        axios.get(`https://api.thecatapi.com/v1/breeds`)
        .then(res => {
            let mynewarray = res.data;
            setCatBreedsArray(mynewarray);
          })
    }


    const getCatImageByBreed = (catBreedId) => { 
        axios.get('https://api.thecatapi.com/v1/images/search?breed_ids='+encodeURI(catBreedId))
        .then(res => {
            let cat = res.data[0];
            setCatImage(cat['url']);
            setCatDesc(cat['breeds'][0]);
            // console.log(cat['breeds'][0]);
        })
    }
    
    const selectBreed = (catBreedId) => {
        getCatImageByBreed(catBreedId);
    }

    React.useEffect(() => {
        getBreeds()
    }, []);
    
    if (catBreedsArray == null) return <div> Loading </div>;

  return (
    <MainContainer> 
     <select  onChange={(event) => selectBreed(event.target.value)}> {catBreedsArray.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
     <h1>{catDescription ? catDescription['name'] : ''}</h1>
     <CatDescription>{catDescription ? catDescription['description'] : ''}</CatDescription>
    <Image src={catImage} />

    </MainContainer>
  );
}
export default CatBreeds;
