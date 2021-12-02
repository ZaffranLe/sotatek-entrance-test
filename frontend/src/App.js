import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { history } from "./history";
import Home from './pages/home';
import NewTask from './pages/new-task';

function App() {
  return (
    <>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-task" component={NewTask} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
