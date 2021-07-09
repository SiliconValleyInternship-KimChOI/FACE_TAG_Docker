import React from 'react';
import axios from 'axios';

const App = () => {
  const onClick = () => {
    axios.post('https://localhost:5000/api/test',{'name': 'Peter'})
  }

  return (
    <div>
      <button onClick = {onClick}>test</button>
    </div>
  );
}

export default App;
