import React from 'react'

export const NotFound = ({page=true}) => {
    return (
        <>
            {
                (page)
                ?
                <div>
                    <div className="container_img  pack_flex">
                        <img src="./assets/404 Page Not Found _Outline.svg" className="img_error" alt=""/>
                    </div>
                    <p className="center">404 Not Found</p>
                </div>
                :
                <div className="loading pack_flex">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                    <p>Espere por favor ...</p>
                </div>
            }
        </>
    )
}
