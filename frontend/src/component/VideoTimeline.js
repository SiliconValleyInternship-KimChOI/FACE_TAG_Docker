import React , {useState} from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const VideoBox = styled.div`
margin-left:10%;
width:40%;
height:100%;
float: left;
`
const TimeBox = styled.div`
margin-left:10%;
width: 40%;
height:100%;
float: left;
`
const Img = styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
`
const Name = styled.div`
float:left;
margin-left:5%;
text-algin: center;
font-family: 'Do Hyeon';
`
const Time = styled.button`
border: 0px;
text-algin: center;
font-family: 'Do Hyeon';
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
    <div>
    <VideoBox>    
    <ReactPlayer url={uploadedurl} height='50%' width='100%' controls={true} ref={p => {setTimeState(p);}}/>  
    </VideoBox>   
     {characters.map(row => {
        return(
            <TimeBox>
            <tr key={row}>
                <td key={row[1]}><Img src={row[1]}/></td>
                <Name key={row[0]}>{row[0]}<br/><br/></Name>
                {row[2].map(time => {
                    return(
                        <td key={row[2]}>
                        <Time onClick={() => timeState.seekTo(parseFloat(time[0]))}>{convertHMS(time[0])}</Time>
                        -<Time onClick={() => timeState.seekTo(parseFloat(time[1]))}>{convertHMS(time[1])}</Time>
                        <br/></td>)})}
            </tr>
            </TimeBox>
        );})}
    </div>
    );
}
export default VideoTimeline;