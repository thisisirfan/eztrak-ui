import React from 'react'

const MultiInput = ({child}) => {
  return (
   <>
    <div className='d-inline-flex multi-select-view'>
        {child.map && child.map((item, index) => {
            return <input  key={index}  />
        })
        }
    </div>
   </>
  )
}

export default MultiInput