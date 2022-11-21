import React from 'react'

interface IProps {
    isLoading: boolean; 
    children: any 
}

const Spinner = ({isLoading, children }:IProps) => {
    return (
        <div>
            {isLoading ? 
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
            : children }
        </div>
    )
}

export default Spinner