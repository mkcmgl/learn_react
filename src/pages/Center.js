import React from 'react'

export default function Center(props) {
    return (
        <div>
            center

            <div onClick={()=> {
                    props.history.push(`/filmsorder`)

                    // console.log(props)
                }}>电影订单</div>
        </div>
    )
}
