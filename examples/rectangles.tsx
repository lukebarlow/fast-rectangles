import { StrictMode, useState } from 'react'
import FastRectangles from '../src/'
import type { Rectangle } from '../src/layout/layoutTypes'

import renderExamplePage from './ui/renderExamplePage'
import pages from './pages'

const rectangles1 : Rectangle[] = []
const rectangles2 : Rectangle[] = []

const width = 400
const height = 400
const numberOfRectangles = 100

const rectangleStates = [rectangles1, rectangles2]

const randomRectangle = () => (
  {
    width: Math.random() * width / 4,
    height: Math.random() * height / 4,
    left: Math.random() * width * 3 / 4,
    top: Math.random() * height * 3 /4
  }
)

for (let i=0 ; i<numberOfRectangles; i++) {
  rectangles1.push(randomRectangle())
  rectangles2.push(randomRectangle())
}

function RectanglesTest () {
  const [recIndex, setRecIndex] = useState(0)
  const [xScale, setXScale] = useState(1)
  const [yScale, setYScale] = useState(1)
  const [xStart, setXStart] = useState(0)
  const [yStart, setYStart] = useState(0)
  return (
    <>
      <button onClick={() => {
        setRecIndex(1 - recIndex)
      }}>toggle</button>
      <div>xScale : 
        <input 
          value={xScale}
          type='range' 
          min={0.5}
          max={10}
          step={0.1} 
          onChange={(e) => {
            setXScale(parseFloat(e.target.value))
          }}
        />
      </div>
      <div>yScale : 
        <input 
          value={yScale}
          type='range' 
          min={0.5}
          max={10}
          step={0.1} 
          onChange={(e) => {
            setYScale(parseFloat(e.target.value))
          }}
        />
      </div>
      <div>xStart : 
        <input 
          value={xStart}
          type='range' 
          min={0}
          max={400}
          step={1} 
          onChange={(e) => {
            setXStart(parseFloat(e.target.value))
          }}
        />
      </div>
      <div>yStart : 
        <input 
          value={yStart}
          type='range' 
          min={0}
          max={400}
          step={1} 
          onChange={(e) => {
            setYStart(parseFloat(e.target.value))
          }}
        />
      </div>
      <br />
      <FastRectangles 
        width={width} 
        height={height}
        rectangles={rectangleStates[recIndex]}
        xScale={xScale}
        yScale={yScale}
        xStart={xStart}
        yStart={yStart}
      />
    </>
  )
}

renderExamplePage(
  (
    <StrictMode>
      <RectanglesTest />
    </StrictMode>
  ),
  pages
)