import { StrictMode, useState } from 'react'
import FastRectangles from '../src/'

import renderExamplePage from './ui/renderExamplePage'
import pages from './pages'

const rectangles1 = {
  a: {
    top: 20,
    left: 20,
    width: 20,
    height: 20
  },
  b: {
    top: 120,
    left: 40,
    width: 30,
    height: 10,
  }
}

const rectangles2 = {
  b: {
    top: 120,
    left: 40,
    width: 30,
    height: 10
  },
  a: {
    top: 20,
    left: 30,
    width: 20,
    height: 20,
  },
  c: {
    top: 20,
    left: 300,
    width: 38,
    height: 17,
  }
}

const width = 400
const height = 400

const rectangleStates = [rectangles1, rectangles2]

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
      <div>
        If the indexing by id is working, then the rectangles
        should not swap places, but only move a little
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