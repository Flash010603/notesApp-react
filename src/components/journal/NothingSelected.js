import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="nothing__container pack_flex">
            <div className="nothing__body pack_flex center">
                <p>Select something</p>
                <p>or</p>
                <p>create an entry!</p>
                <i className="far fa-star animate__animated animate__flip"></i>
            </div>
        </div>
    )
}
