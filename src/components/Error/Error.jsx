import React from 'react'

const Error=(error)=> {
    console.log(11,error)
    return (
        <div style={{ marginTop:'20px',marginLeft:'20px' }}>
          {error.error.message}
        </div>
    )
}

export default Error
