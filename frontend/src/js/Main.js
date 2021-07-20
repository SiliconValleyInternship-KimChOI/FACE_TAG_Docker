import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';
import {Link} from "react-router-dom";
import VideoUpload from './VideoUpload';

<meta name="viewport" content="width=device-width, initial-scale=1.0" />


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content:center;
  // background-size: cover;
`

const Text = styled.div`
  color: black;
  @media screen and (max-width: 800px){
    font-size: 1.5rem;
  }
  @media screen and (max-width: 550px){
    font-size: 1rem;
  }
  @media screen and (max-width: 420px){
      font-size: 0.7rem;
  }
  font-size: 2rem;
  margin: 5%;
  text-align: center;
  font-family: 'Do Hyeon';
`

const Img = styled.img`
  display: flex;
  width: 13%;
  margin: auto;
  margin-top: 10%
`

const Main = () => {
    return(
        <Container>
          <Link to = "/">
            <Img src={Logo}/>
          </Link>
          <Text>동영상을 업로드하고, 해당 영상의 등장 인물을 구분해보세요!</Text>
          <VideoUpload></VideoUpload>
        </Container>
    )
}

export default Main;

