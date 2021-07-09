import './css/App.css'
import Main from './js/Main'
import Result from './js/Result'
import {Route} from "react-router-dom"

function App() {
  return (
    <div>
      <Route path="/" component={Main} exact/>
      <Route path="/result" component={Result} />
    </div>
  );
}

export default App;
