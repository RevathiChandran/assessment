import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useElementWatcher } from "use-element-watcher";
 import {MdZoomIn, MdZoomOut} from 'react-icons/md'
import {FaPlus, FaMinus} from 'react-icons/fa'
import {updatePrecision} from '../redux/action';
const BookOrderView = () => {
    //@ts-ignore
    const bookOrder = useSelector((state)=>state?.bookOrderData);
    const [level, setLevel] = useState(1.0)
    const decLevel = () => setLevel(level + 0.1)
    const incLevel = () => setLevel(level - 0.1);
    const dispatch = useDispatch();
  
    useEffect(()=>{
// console.log(bookOrder)
    },[bookOrder])
    const maxBids = Object.keys(bookOrder.bids).reduce((t,i) => {
        if( bookOrder.bids[i] &&  bookOrder.bids[i]?.total && t < bookOrder.bids[i].total) { 
          return bookOrder.bids[i].total}
        else { 
          return t 
        }
      },0)
      const maxAsks = Object.keys(bookOrder.asks).reduce((t,i) => {
        if(bookOrder.asks[i] &&  bookOrder.asks[i]?.total && t < bookOrder.asks[i].total) { 
          return bookOrder.asks[i].total}
        else { 
          return t 
        }
      },0)
    
    return (
        <div>
             <div  style={{borderBottom: '1px solid #555', padding: '5px', marginBottom: '5px',height:'43px'}}>
                            <p>
                                <span className="header" style={{float:'left'}}>
                                   ORDER BOOK <span className="sub-header">BTC/USA</span>
                                </span>
                                <span className="header" style={{float:'right'}}>
    <span onClick={()=>dispatch(updatePrecision())} className={bookOrder.precision=='P0'?'disabled p-2':'p-2'}> .0</span>
    <span onClick={()=>dispatch(updatePrecision())} className={bookOrder.precision=='P1'?'disabled p-2':'p-2'}> .00</span>
      <span className="p-2" onClick={ decLevel }><MdZoomOut/></span>
      <span className="p-2" onClick={ incLevel }><MdZoomIn/></span>
                                </span>
                            </p>
                        </div>
                <div className="chart-data-container">
                    <table className="left" cellSpacing="0" cellPadding="0">
                       
                        <thead>
                            <tr>
                                <th style={{textAlign: 'center'}}>COUNT</th>
                                <th>AMOUNT</th>
                                <th>TOTAL</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>

                        <thead>
                            {
                                bookOrder.bidsPrice.map((e, i) => {
                               const gradient = ((bookOrder.bids[e].total * 100) / (maxBids * level))
                                    return (
                                        <tr key={i} style={{
                                            backgroundImage: `linear-gradient(to left, #314432 ${ gradient }%, #1b262d 0%)`
                                          }} className="table-data bids">
                                            <td style={{textAlign: 'center'}}>{bookOrder.bids[e]?.count}</td>
                                            <td>{bookOrder.bids[e]?.amount.toFixed(4)}</td>
                                            <td>{bookOrder.bids[e]?.total.toFixed(4)}</td>
                                            <td >{bookOrder.bids[e]?.price.toLocaleString("en-IN")}</td>
                                        </tr>
                                    );
                                })
                             }
                        </thead>
                    </table>

                    <table className="right" cellSpacing="0" cellPadding="0">
                        <thead>
                            <tr>
                                <th>PRICE</th>
                                <th>TOTAL</th>
                                <th>AMOUNT</th>
                                <th style={{textAlign: 'center'}}>COUNT</th>
                            </tr>
                        </thead>

                        <thead className="second-fold-data">{
                                bookOrder.asksPrice.map((e, i) => {
                                    const gradient = ((bookOrder.asks[e].total * 100) / (maxAsks * level))
                                    return (
                                        <tr key={i} className="table-data asks"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, #402c33 ${ gradient }%, #1b262d 0%)`
                                          }}
                                          >
                                            <td>{bookOrder.asks[e]?.price.toLocaleString("en-IN")}</td>
                                            <td>{((bookOrder.asks[e]?.count * bookOrder.asks[e]?.amount)<0?(bookOrder.asks[e]?.count * bookOrder.asks[e]?.amount)*-1:(bookOrder.asks[e]?.count * bookOrder.asks[e]?.amount)).toFixed(4)}</td>
                                            <td>{(bookOrder.asks[e]?.total).toFixed(4)}</td>
                                            <td style={{textAlign: 'center'}}>{bookOrder.asks[e]?.count}</td>
                                        </tr>
                                    );
                                })
                            }
                        </thead>
                    </table>
                </div>
             
            
    </div>
       )
}
export default BookOrderView;