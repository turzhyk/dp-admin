import React from 'react'
import { convertToDate } from './Utilities/DateConverter'

export default function OrderListItem() {
  return (
   <div className="item">
          <div className="flex justify-between font-bold flex-1 ">
            <div>
              <p>nr10034</p>
            </div>
            <div className="text-right mr-5"></div>
          </div>
          <div className="status inprogress">Nowe</div>
        </div>
  )
}
