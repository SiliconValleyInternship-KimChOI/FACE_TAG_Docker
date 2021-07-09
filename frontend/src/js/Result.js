import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';
import {Link} from "react-router-dom";
import ReactPlayer from 'react-player'

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

const Result= () => {
    return(
        <Container>
            <Link to = "/">
            <Img src={Logo} alt = "logo" />
            </Link>
            <Box>
                <Text>동영상 인물 태깅 완료! </Text>
            </Box>
            <Box>
            <ReactPlayer url="https://www.youtube.com/watch?v=-RDb-kSw-Ag&list=PL-FWHmxvuJ58xikmMnl2GQ610zeU0X4tz" 
            height='300px' controls="true"/>
            </Box> 
        </Container>
    )
}

export default Result;