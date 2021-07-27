import React , {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../css/index.css';
import axios from 'axios';
import Logo from '../css/logo.png';
import Banner from '../css/banner.png'
import {Link} from 'react-router-dom';
import VideoTimeline from '../component/VideoTimeline';
import Loading from '../component/Loading';

const Header = styled.div`
width:100%;
height:10%;
`
const Body = styled.div`
width: 100%;
height: 100%;
background-color: #F5F5F5;
`
const Box = styled.div`
width:100%;
height:100%;
margin:0%;
display:flex;
align-items:center;
justify-content:center;
`
const Text = styled.p`
color: black;
padding: 3%;
font-size:2em;
text-algin: center;
font-family: 'Do Hyeon';
display:flex;
align-items:center;
justify-content:center;
  `
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
const Result= (props) => {
  const filename = props.location.aboutProps;
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(null); //db -> name, image, timeline
  const [uploadedurl, setUploadedurl] = useState(null);  //video url

    useEffect (() => {
      // video
      axios.post('http://localhost:5000/fileDown', filename).then(response=>{
      console.log(response.data);
      setUploadedurl(response.data.url);
      setData(response.data.timeline);
      setLoading(false);
    }).catch(error=>{
      console.log(error);
      setLoading(true);
    });},[]);
    return(
        <div>
          <Header>
          <Link to = '/'><Img src={Logo} width="30%" height="30%"/></Link>
          <Img2 src={Banner}/>
          </Header>

          <Body>
          {loading ? <Text>동영상 인물 태깅 중...</Text> : <Text>동영상 인물 태깅 완료!</Text>}
            <Box>
            {loading ? <Loading/> : <div><VideoTimeline data={data} url={uploadedurl}/></div>}
            </Box>  
          </Body>         
        </div>
    )
  };
export default Result;