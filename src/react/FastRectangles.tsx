import { useEffect, useRef } from 'react'

import RectanglesLayout from '../layout/RectanglesLayout'
import RectanglesWebGL from '../webgl/RectanglesWebGL'
import type { Rectangles } from '../layout/layoutTypes'

interface Props {
  fill?: string
  stroke?: string
  hoverFill?: string
  hoverStroke?: string
  width: number
  height: number
  xScale?: number
  yScale?: number
  xStart?: number
  yStart?: number
  xSpacing?: number
  transitionDuration?: number
  rectangles: Rectangles
}

const FastRectangles = ({
  fill = 'gray',
  stroke = 'black',
  hoverFill,
  hoverStroke,
  width,
  height,
  rectangles,
  xScale = 1,
  yScale = 1,
  xStart = 0,
  yStart = 0,
  xSpacing = 0,
  transitionDuration
}: Props) => {
  const main = useRef<HTMLCanvasElement>(null)
  const mouseDetectionCanvas = useRef<HTMLCanvasElement>(null)
  const layout = useRef<RectanglesLayout | undefined>()
  const rectanglesWebGL = useRef<RectanglesWebGL | undefined>()
  const mouseDetectionWebGL = useRef<RectanglesWebGL | undefined>()

  // initialise webgl component, connected to the canvas and the layout
  useEffect(() => {
    if (!main.current || !mouseDetectionCanvas.current) {
      return
    }
    if (layout.current && rectanglesWebGL.current) {
      return
    }
    layout.current = new RectanglesLayout(
      width, height, xScale, yScale, 
      fill, stroke, hoverFill, hoverStroke,
      xSpacing
    )
    rectanglesWebGL.current = new RectanglesWebGL(main.current, layout.current)
    mouseDetectionWebGL.current = new RectanglesWebGL(
      mouseDetectionCanvas.current, layout.current, true
    )
  }, [main.current, mouseDetectionCanvas.current])

  // pass rectangles changes to the layout component
  useEffect(() => {
    if (!rectanglesWebGL.current) {
      return
    }
    layout.current?.transitionToRectangles(rectangles, transitionDuration)
  }, [rectangles, width, height])

  // pass scale changes to the layout component
  useEffect(() => {
    if (!rectanglesWebGL.current) {
      return
    }
    layout.current?.transitionToScale(
      xScale, yScale, xStart, yStart, 
      transitionDuration
    )
  }, [xScale, yScale, xStart, yStart])

  useEffect(() => {
    if (!layout.current) {
      return
    }
    layout.current.setColours(
      fill, stroke, hoverFill, hoverStroke
    )
  }, [fill, stroke, hoverFill, hoverStroke])

  const canvasWidth = width * window.devicePixelRatio
  const canvasHeight = height * window.devicePixelRatio

  return (
    <>
      <div style={{ width, height }}>
        <div style={{position: 'absolute'}}>
          <canvas
            ref={main}
            width={canvasWidth}
            height={canvasHeight}
            onMouseMove={(e) => {
              const rect = (e.target as HTMLCanvasElement)
                .getBoundingClientRect()
              const x = (e.pageX - rect.left) * window.devicePixelRatio
              const y = (rect.height - (e.pageY - rect.top)) 
                * window.devicePixelRatio
              const key = mouseDetectionWebGL.current?.keyAtPixel(x, y)
              layout.current?.handleMouseOver(key)
            }}
            style={{
              width,
              height,
              backgroundColor: 'transparent',
              position: 'absolute'
            }}
          />
          <canvas
            ref={mouseDetectionCanvas}
            width={canvasWidth}
            height={canvasHeight}
            style={{
              width,
              height,
              visibility: 'hidden',
              position: 'absolute'
            }}
          />
        </div>
      </div>
    </>
  )
}

export default FastRectangles