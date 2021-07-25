import React from 'react';
import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/logo.png';
import Banner from '../css/banner.png'
import {Link} from "react-router-dom";
import VideoUpload from '../component/VideoUpload';

/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */

const Header = styled.div`
  width:100%;
  height:10%;
`
const Body = styled.div`
  width: 100%;
  height: 90%;
  background-color: #F5F5F5;
`
const VideoBox = styled.div`
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   justify-content:center;
// `

// const Text = styled.div`
//   color: black;
//   @media screen and (max-width: 800px){
//     font-size: 1.5rem;
//   }
//   @media screen and (max-width: 550px){
//     font-size: 1rem;
//   }
//   @media screen and (max-width: 420px){
//       font-size: 0.7rem;
//   }
//   font-size: 2rem;
//   margin: 5%;
//   text-align: center;
//   font-family: 'Do Hyeon';
// `

const Img = styled.img`
  width: 17%;
  height: 13%;
  position: absolute;
  margin: 1% 40%
`
const Img2 = styled.img`
  width: 100%;
  height: 20%;
  margin: 9% 0% 3% 0%
`

const Main = () => {
    return(
        <div>
          <Header>
          <Link to = '/'><Img src={Logo} width="30%" height="30%"/></Link>
          <Img2 src={Banner}/>
          </Header>
          <Body>
          <VideoBox><VideoUpload></VideoUpload></VideoBox>
          </Body>
        </div>
    )
}

export default Main;

