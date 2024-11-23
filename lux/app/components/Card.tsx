import React, { useState } from 'react';


const Card = () => {
  const [gradient, setGradient] = useState();

  return (
    <>
    <div>
      <div style = {{background: `linear-gradient(-45deg, ${gradient}`}}></div>
    </div>
    </>
  )

}