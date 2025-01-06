import './App.css';
import './App.scss'
import {BookOrderStack1} from './bookOrderStack1.js';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import BookOrderView from './component/bookOrderView.tsx';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <div className="container containers">
      <BookOrderStack1 />
      <div style={{width: '700px'}}>
      <BookOrderView /></div>
</div>
    </div>
    
   </Provider>
  );
}

export default App;
