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
const Result= (props) => {
  const filename = props.location.aboutProps;
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(null); //db -> name, image, timeline
  const [uploadedurl, setUploadedurl] = useState(null);  //video url

    useEffect (() => {
      // video

      // axios.post('/fileDown', filename).then(response=>{                     // ec2
      axios.post('http://localhost:5000/fileDown', filename).then(response=>{   // local
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
          <Link to = '/'><Img src={Logo} height="80%"/></Link>
          </Header>
          <Img2 src={Banner}/>
          <Body>
            {loading ? 
                <div className="loadingbox">
                  <Loading/> 
                  <br></br>
                  processing...
                </div>         
                  :  
                <VideoTimeline data={data} url={uploadedurl}/>  
            }
          </Body>         
        </div>
    )
  };
export default Result;
