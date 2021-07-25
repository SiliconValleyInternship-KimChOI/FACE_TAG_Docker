import styled from 'styled-components';
import React from 'react';

const Box = styled.div`
width:100%;
height:100%;
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
const Time = styled.div`
margin-left:5%;
text-algin: center;
font-family: 'Do Hyeon';
`
const Timeline = (props) => {
const data = props.data;
const data_length = props.data.length;
const characters = new Array();
let temp = -1;
for (let i=0; i<data_length; i++){
    if (i != 0 && data[i][0] == data[i-1][0]){
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
console.log(characters);


return(
<div>
 {characters.map(row => {
    return(
        <Box>
        <tr key={row}>
            <td key={row[1]}><Img src={row[1]}/></td>
            <Name>{row[0]}<br/><br/></Name>
            {row[2].map(time => {
                return(
                    <Time>{time[0]}-{time[1]}<br/></Time>)})}
        </tr>
        </Box>
    );})}
</div>
);
}

export default Timeline;