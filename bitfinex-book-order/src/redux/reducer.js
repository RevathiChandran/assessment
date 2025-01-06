import { React } from 'react';
import { UPDATE_BOOK_ORDER_VIEW1,UPDATE_BOOK_ORDER_VIEW2, RESET_BOOK_ORDER_DETAIL
    ,UPDATE_ASKS_PRICE , UPDATE_BIDS_PRICE,UPDATE_PRECISION
} from './action'

const initialState = {
    bids:[],
    asks:[],
    iteration:0,
    bidsPrice:[],
    asksPrice:[],
    precision:'P0'
}

const bookOrderReducer = (state=initialState,action)=>{
switch(action.type){
    case UPDATE_BOOK_ORDER_VIEW1:
          return  {...state, bids:action.data}
        break;
        case UPDATE_BOOK_ORDER_VIEW2:
            return  {...state, asks:action.data}
          break;
          case UPDATE_ASKS_PRICE:
            return  {...state, asksPrice:action.data}
          break;
            case UPDATE_BIDS_PRICE:
                return  {...state, bidsPrice:action.data}
          break;
          case UPDATE_PRECISION:
            return {...state,precision:state.precision=='P0'?'P1':'P0'}
    case RESET_BOOK_ORDER_DETAIL:
        return {...state,initialState}
        break;
    default:
        return state;
}
}

export default bookOrderReducer;