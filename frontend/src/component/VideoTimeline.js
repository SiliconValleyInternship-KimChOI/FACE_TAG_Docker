import React , {useState} from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Box = styled.div`
width:90%;
margin:0 0 5% 0;
padding:5%;
border-bottom: 1px solid #DCDCDC;
`
const Profile=styled.div`
display:flex;    
justify-content: center;
align-items: center;
`

const Img = styled.img`
width:70px;
height: 70px;
border-radius: 50%;
margin-right: 10px;
`

const Name = styled.div`
float:left;
font-size: 16px;
font-weight: 700;
weight: 100%;
`
const VideoBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:3%;
float: left;
height:480px;
@media only screen and (min-width: 1300px) {
    width:800px;
    margin:50px 15px 40px 0;
}
@media only screen and (max-width: 1300px) {   
    width: 90%;
}
@media only screen and (max-width: 600px) {   
    width: 90%;
    height: 300px
}

`
const TimeBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:3%;
float: left;
width:325px;
@media only screen and (min-width: 1300px) {
    height:480px;
    margin:50px 0 40px 15px;
}
@media only screen and (max-width: 1300px) {
    width:70%;
    margin:30px 0 40px 0;
}
@media only screen and (max-width: 500px) {
    width:90%;
    margin:30px 0 40px 0;
}
`
const Timediv = styled.div`
width:100%;
height:90%;
overflow: auto;
@media only screen and (max-width: 500px) {
    height:80%;
}
`

const Div = styled.div`
display:flex;    
justify-content: center;
align-items: center;
@media only screen and (max-width: 1300px) {
    flex-direction: column;
    width:100%;
}
`   

const Time = styled.button`
background:white;
border: 0;
color:#58392A;
cursor:pointer;
font-size: 14px;
`

const DownloadedVideo = styled(ReactPlayer)`
width: 100% !important;
height: 90% !important;
@media only screen and (max-width: 500px) {
    margin-top: -5%;
}
`


const VideoTimeline = (props) => {
    const data = props.data;
    const data_length = props.data.length;
    const characters = new Array();
    let temp = -1;
    for (let i=0; i<data_length; i++){
        if (i !== 0 && data[i][0] === data[i-1][0]){
            characters[temp][2].push([data[i][2],data[i][3]]);
        }
        else{
        temp++;
        characters[temp] = []
        characters[temp].push(data[i][0]);
        characters[temp].push(data[i][1]);
        characters[temp][2] = new Array();
        characters[temp][2].push([data[i][2],data[i][3]]);        
        }
    }
    const uploadedurl = props.url;
    const [timeState,setTimeState] = useState(0.0);



    const convertHMS = (value) => {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    }

    return(
        <Div>
        <VideoBox>
            <div className="title">Tagged Video</div>
            <DownloadedVideo url={uploadedurl} controls={true} ref={p => {setTimeState(p);}}/>
        </VideoBox>

        <TimeBox>
                <div className="title">Timeline</div>
                <Timediv>
                {characters.map(row => {
                    return(
                        <Box>
                        <tr key={row}>
                            <td key={row[1]}>
                                <Profile>
                                    <Img src={row[1]}/>
                                    <Name>{row[0]}</Name>
                                </Profile> 
                            </td>      
                        </tr>
                        <tr>
                            <td colsplan="2"><br/>{row[2].map(time => {
                                return(  
                                    <div>
                                        <Time onClick={() => timeState.seekTo(parseFloat(time[0]))}>{convertHMS(time[0])}</Time>
                                          ~ <Time onClick={() => timeState.seekTo(parseFloat(time[1]))}>{convertHMS(time[1])}</Time>
                                    </div>
                                )})}
                            </td>

                        </tr>
                        </Box>
                    );})}
                </Timediv>
        </TimeBox>
    </Div>
    );
}
export default VideoTimeline;