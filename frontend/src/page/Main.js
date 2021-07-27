import React from 'react';
import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/logo.png';
import Banner from '../css/banner.png'
import {Link} from "react-router-dom";
import VideoUpload from '../component/VideoUpload';

/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */

const Header = styled.div`
  height:80px;
  position: fixed; top:0;left:0;right:0;
  text-align:center;
  background:white;
  padding:5px 0 0 0;
  border-bottom: 3px solid #DCDCDC;
`
const Body = styled.div`
  background-color: #F5F5F5;
`
const Img = styled.img`
  padding-top:5px;
`
const Img2 = styled.img`
  width: 100%;
  margin: 85px 0% 3% 0%
`

const Main = () => {
    return(
        <div>
          <Header>
          <Link to = '/'><Img src={Logo} height="80%"/></Link>
          </Header>
          <Img2 src={Banner}/>
          <Body>
          <VideoUpload></VideoUpload>
          </Body>
        </div>
    )
}

export default Main;

