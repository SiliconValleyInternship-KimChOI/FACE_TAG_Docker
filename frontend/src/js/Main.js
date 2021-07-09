import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';
import {Link} from "react-router-dom";
import VideoUpload from './VideoUpload';

// #수직정렬
// display:flex;
// align-items:center;
// justify-content:center;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const Box = styled.div`
  width:100%;
  height:50%;
  border: 0px;
  display:flex;
  align-items:center;
  justify-content:center;
`
const Text = styled.p`
  color: black;
  font-size:2em;
  margin-top:15%;
  font-family: 'Do Hyeon';
`
const Img = styled.img`
  width: 12%;
  height: 24%;
  position: absolute;
  margin: 1% 45%;
`

const Main = () => {
    return(
        <Container>
          <Link to = "/">
            <Img src={Logo}/>
          </Link>
          <Box>
              <Text>동영상을 업로드하고, 해당 영상의 등장 인물을 구분해보세요!</Text>
          </Box>
          <Box>
            <VideoUpload></VideoUpload>
          </Box>
        </Container>
    )
}

export default Main;