import bookOrderReducer from './reducer';
import { combineReducers} from 'redux';
let rootReducer = combineReducers({bookOrderData:bookOrderReducer})
export default rootReducer