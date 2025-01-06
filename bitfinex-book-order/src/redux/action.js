export const UPDATE_BOOK_ORDER_VIEW1="UPDATE_BOOK_ORDER_VIEW1";
export const UPDATE_BOOK_ORDER_VIEW2="UPDATE_BOOK_ORDER_VIEW2";
export const RESET_BOOK_ORDER_DETAIL="RESET_BOOK_ORDER_DETAIL";
export const UPDATE_BIDS_PRICE="UPDATE_BIDS_PRICE";
export const UPDATE_ASKS_PRICE="UPDATE_ASKS_PRICE";
export const UPDATE_PRECISION="UPDATE_PRECISION";

export function updatePrecision(){
    return {
        type:UPDATE_PRECISION
    }
}
export function updateBidsPrice(payload){
    return {
        type:UPDATE_BIDS_PRICE,
        data:payload
    }  
}
export function updateAsksPrice(payload){
    return {
        type:UPDATE_ASKS_PRICE,
        data:payload
    }  
}

export function updateOrderView1(payload){
    return {
        type:UPDATE_BOOK_ORDER_VIEW1,
        data:payload
    }
}
export function updateOrderView2(payload){
    return {
        type:UPDATE_BOOK_ORDER_VIEW2,
        data:payload
    }
}
export function resetDetail(){
    return {
        type:RESET_BOOK_ORDER_DETAIL
    }
}