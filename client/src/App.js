import './App.css';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import ViewItem from './components/ViewItem';
import EditItem from './components/EditItem';
import LogReg from "./views/LogReg";
import {Router} from '@reach/router';


function App() {

  return (
    <div className="App">
      <Router>
        <LogReg path="/"/>
        <ItemList path="/home" />
        <AddItem path="/new" />
        <ViewItem path="/item/:id" />
        <EditItem path="/item/edit/:id" />
      </Router>
    </div>
  );
}

export default App;