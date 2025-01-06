import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderView1, updateOrderView2,updateBidsPrice,
  updateAsksPrice
 } from './redux/action';
export const BookOrderStack1 = () => {
    let orderData = [];
  const [socketUrl, setSocketUrl] = useState('wss://api-pub.bitfinex.com/ws/2');
  // const [messageHistory, setMessageHistory] = useState([]);
  const dispatch =useDispatch();
  const [bookOrder, setBookOrder] = useState([]);
  const [bookOrderAsk, setBookOrderAsk] = useState([]);
  const [bookOrderBid, setBookOrderBid] = useState([]);
  const [channelID, setChanelID] = useState('');
  //@ts-ignore
  // const orderData = useSelector((state)=>state?.bookOrderData.orderView);
  const { sendMessage, lastMessage, readyState, lastJsonMessage } = useWebSocket(socketUrl);
  const [prevBidsData,setPrevBidsData] = useState([]);
  const [prevAskData,setPrevAskData] = useState([]);
   const [book,setBook] = useState({
      bids:[],
      asks:[],
      bidsPrice:[],
      askPrice:[],
      iteration:0
    })
    const precision = useSelector((state)=>state?.bookOrderData?.precision)
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  
  useEffect(()=>{
    if(lastJsonMessage){
      if(lastJsonMessage?.chanId)
        setChanelID(lastJsonMessage.chanId)
    }
    if(channelID){
      let data = lastJsonMessage[1]
      if (data && data.length) {
        if((data.length==3 && data.length>2))
          data = [data];
        if(!(data[0].length<3)){
        const dataList = data.filter((d) => {
            return Array.isArray(d) && d.length <= 3;
        });
       
        organiseData(dataList)
      }
    }
    
    }
    
  },[lastJsonMessage])
  useEffect(()=>{
// console.log(bookOrder)
  },[bookOrder])
 const organiseData = useCallback((dataList)=>{
    // organiseData(dataList)
    let temp = book;
    // orderData.push(...data);
    dataList.forEach((e) => {
      if(temp.iteration !=0 && e[1]==0){
        let bidOrAsk = (e[2] >= 0 ? 'bids' : 'asks');
        if(temp[bidOrAsk].indexOf(temp[bidOrAsk][e[0]])){
        delete temp[bidOrAsk][e[0]];
        temp[bidOrAsk].splice((temp[bidOrAsk].indexOf(temp[bidOrAsk][e[0]])), 1);
        }
      }
      else{
       if(dataList.length>3)
          temp.iteration++;
      if(e[2] > 0 || e[2]< 0){
       let bidOrAsk = (e[2] >= 0 ? 'bids' : 'asks');
      //  console.log(bidOrAsk, e);
      temp[bidOrAsk][e[0]] = {"price": e[0],"count": e[1],"amount": e[2], "total": e[1] * e[2]<0?(-1*e[2]):e[2]};
     }
    }
     });
    updateAskSell(temp);
})

const updateAskSell = useCallback((temp)=>{
  (['bids','asks']).forEach((bidOrAsk) =>{
    let temp1 = temp[bidOrAsk]
    let tempPrices = Object.keys(temp1)
  
    let prices = tempPrices.sort(function (a, b) {
      if (bidOrAsk === 'bids') {
        return +a >= +b ? -1 : 1
      } else {
        return +a <= +b ? -1 : 1
      }
    })
    let d = bidOrAsk =='bids'?'bidsPrice':'askPrice';
    temp[d] = prices;
  });
  dispatch(updateOrderView1([...temp.bids]));
  dispatch(updateBidsPrice([...(temp.bidsPrice).slice(0,21)]));
  dispatch(updateAsksPrice([...(temp.askPrice).slice(0,21)]));
  dispatch(updateOrderView2([...temp.asks]));
  localStorage.setItem('bids', [...temp.bids]);
  localStorage.setItem('asks', [...temp.asks]);
  localStorage.setItem('bidsPrice', [...(temp.bidsPrice).slice(0,21)]);
  localStorage.setItem('askPrice', [...(temp.askPrice).slice(0,21)]);
  // setBook(temp);

})
useEffect(()=>{
// console.log(book)
},[book])
const sortOrder= useCallback((data)=>{
  return  data.sort((a, b) => b.price - a.price);

});

const handleClickSendMessage = useCallback((data) => sendMessage(data), []);
const handleSocketResponse=(lastJsonMessage) =>{
  let temp=bookOrder;
  if(lastJsonMessage[0] == channelID){
    // if(bookOrder.indexOf((lastJsonMessage[1][0])) != -1)

      bookOrder.forEach((e,i)=>{
        if(e[0] == (lastJsonMessage[1][0])){
          console.log(lastJsonMessage[0] , "....---",lastJsonMessage[1])
          bookOrder[i][1] = lastJsonMessage[1][1];
          bookOrder[i][2] = lastJsonMessage[1][2];
        }
        else{
          if(e[0]< (lastJsonMessage[1][0]) &&bookOrder[i+1] > (lastJsonMessage[1][0]))
          temp.push((lastJsonMessage[1][0]));
          console.log(lastJsonMessage[0] , "....###",lastJsonMessage[1])
        }
      })
      setBookOrder(temp);
}
}
useEffect(()=>{
  if(connectionStatus == 'Open')
  handleClickSendMessage(JSON.stringify({"event": "subscribe","channel": "book","symbol": "tBTCUSD","prec":precision,"pair":"BTCUSD","freq":"F0"}));
},[precision])
  useEffect(()=>{
    if(connectionStatus == 'Open'){
     handleClickSendMessage(JSON.stringify({"event": "subscribe","channel": "book","symbol": "tBTCUSD","prec":"P0","pair":"BTCUSD","freq":"F0"}));
    }
    if(connectionStatus == 'connecting'){
      dispatch(updateOrderView1(localStorage.getItem('bids')));
      dispatch(updateBidsPrice(localStorage.getItem('bidsPrice')));
      dispatch(updateAsksPrice(localStorage.getItem('askPrice')));
      dispatch(updateOrderView2(localStorage.getItem('asks')));
    }
  },[connectionStatus])
  

  return (
<div>

</div>
  );
};