import './css/App.css'
import Main from './page/Main'
import Result from './page/Result'
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
