import React from 'react'
import moment from 'moment'

moment.locale('es');
interface IProps{
    list: any[]
}



const AidList = ({list}:IProps) => {
    return (
        <div className="list-group">
            {
                list.map((aid)=>{
                    return <a  className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 text-start" >{aid.description}</h5>
                            <small></small>

                            <small>{ moment(aid.date).format('LLLL')}</small>
                        </div>
                   
                    <p className="mb-1 text-start"> {aid.comment}</p>
                </a>
                })
            }

           
        </div>
    )
}

export default AidList