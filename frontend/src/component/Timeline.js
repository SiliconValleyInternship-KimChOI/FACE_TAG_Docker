import styled from 'styled-components';

const Table = styled.table`
  margin: 0% 15%;
  width:70%;
  border: 1px solid;
  border-radius: 15px;
  align-items:center;
  text-align:center;
  font-family: 'Do Hyeon';
`
const Td = styled.td`
  font-size: 1.4em;
  border-top: 1px solid;
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
            <Table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Timeline</th>
                    </tr>
                </thead>

                <tbody>
                    {characters.map(row => {
                        return(
                            <tr key={row}>
                                <Td key={row[1]}><img src={row[1]} width='200px' height='200px'/></Td>
                                <Td key={row[0]}>{row[0]}</Td>
                                <Td key={row[2]}>
                                {row[2].map(time => {
                                    return(
                                        <p>{time[0]}-{time[1]}</p>
                                    )
                                })}
                                </Td> 
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default Timeline;