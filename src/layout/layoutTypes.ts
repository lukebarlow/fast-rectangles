export type Interval = 'day' | 'week' | 'month' | 'quarter' | 'year'

export type UnscaledRectangle = {
  rowId: string
  left: number
  right: number
  height: number
  bottomWithinRow?: number
  userData?: any
}

export type Rectangle = {
  width: number
  height: number
  top: number
  left: number
  userData?: any
}

export type Rectangles = Rectangle[] | Record<string, Rectangle>

export type UserDisplayOptions = {
  interval: Interval
  splitBy?: string
}

export type ViewOptions = {
  width: number
  height: number
  pixelsPerDay: number
  epochLeft: number
}

export type LayoutRow = {
  key: string
  values: any[]
  domain?: [number, number]
  domainHeight?: number
  minHeight?: number
  hidden?: boolean
  height?: number
  axisHeight?: number
  offset?: number
  yScale?: (input: number) => number
  y0?: number
}
