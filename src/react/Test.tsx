import React, { useEffect, useRef } from 'react'

import RectanglesLayout from '../layout/RectanglesLayout'
import RectanglesWebGL from '../webgl/RectanglesWebGL'

import type { Rectangle } from '../layout/layoutTypes'

interface Props {
  width: number
  height: number
  xScale?: number
  yScale?: number
  xStart?: number
  yStart?: number
  rectangles: Rectangle[] | Record<string, Rectangle>
}

const Test = ({ 
  width, 
  height, 
  rectangles,
  xScale = 1, 
  yScale = 1,
  xStart = 0,
  yStart = 0
} : Props) => {
  // const main = useRef<HTMLCanvasElement>(null)
  // debugger
  const mouseDetectionCanvas = useRef<HTMLCanvasElement>(null)

  // const canvasWidth = width * window.devicePixelRatio
  // const canvasHeight = height * window.devicePixelRatio

  return (
    <>
      <div>starting to do fast rectangles</div>
      {/* <canvas 
        ref={mouseDetectionCanvas}
        width={canvasWidth} 
        height={canvasHeight}
        style={{
          width,
          height,
          visibility: 'hidden'
        }}
      /> */}
    </>
    
  )
}

export default Test