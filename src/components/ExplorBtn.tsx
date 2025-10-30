import Image from 'next/image'
import React from 'react'

/**
 * A functional component that renders an exploration button
 * The component is named ExplorBtn and returns a simple div with text
 */
const ExplorBtn = () => {
  return (
    <button type='button' id='explore-btn' className='mt-7 mx-auto'>
      <a href="#events">
        Explore Events
        <Image src='/icons/arrow-down.svg' width={24} height={24} alt='arrow-down' />
      </a>
    </button>  
  )
}

export default ExplorBtn