import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Rectangle } from '../layout/layoutTypes'
import FastRectangles from './FastRectangles'

export default {
  title: 'FastRectangles',
  component: FastRectangles,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    xScale: { control: { type: 'range', min: 0.1, max: 5, step: 0.01 }},
    yScale: { control: { type: 'range', min: 0.1, max: 5, step: 0.01 }},
    xStart: { control: { type: 'range', min: -400, max: 400, step: 1 }},
    yStart: { control: { type: 'range', min: -400, max: 400, step: 1 }},
    fill: { control: 'color' },
    stroke: { control: 'color' },
    hoverFill: { control: 'color' },
    hoverStroke: { control: 'color' },
  },
  args: {
    xScale: 1,
    yScale: 1,
    xStart: 0,
    yStart: 0,
    fill: 'red',
    stroke: 'blue',
    hoverFill: 'green',
    hoverStroke: 'blue'
  },
} as ComponentMeta<typeof FastRectangles>

const width = 400
const height = 400

const randomRectangle = () => (
  {
    width: Math.random() * width / 4,
    height: Math.random() * height / 4,
    left: Math.random() * width * 3 / 4,
    top: Math.random() * height * 3 /4
  }
)

const rectangles1 : Rectangle[] = []
const rectangles2 : Rectangle[] = []
const numberOfRectangles = 100
for (let i=0 ; i<numberOfRectangles; i++) {
  rectangles1.push(randomRectangle())
  rectangles2.push(randomRectangle())
}

export const Primary: ComponentStory<typeof FastRectangles> = (args) => {
  const rectangleStates = [rectangles1, rectangles2]
  const [recIndex, setRecIndex] = useState(0)
  return (
    <>
      <button onClick={() => {
        setRecIndex(1 - recIndex)
      }}>toggle</button>
     
      <br />
      <FastRectangles
        {...args}
        width={width}
        height={height}
        rectangles={rectangleStates[recIndex]}
      />
    </>
  )
}
