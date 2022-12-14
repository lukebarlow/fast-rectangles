import createTransition from './createTransition'
import Dispatcher from './Dispatcher'
// import Stats from 'stats.js'
import type { Rectangle } from './layoutTypes'

// const stats = new Stats()
// stats.showPanel( 0 )
// document.body.appendChild( stats.dom )

type Rectangles = Rectangle[] | Record<string, Rectangle>

export default class RectanglesLayout {
  fill: string
  stroke: string
  hoverFill?: string
  hoverStroke?: string
  xScale: number
  yScale: number
  xStart = 0
  yStart = 0
  /* 
    xSpacing = pixels subtracted from the width of 
    each rectangle after scaling
  */
  xSpacing = 0 
  width: number
  height: number
  size = 0
  positions: Float32Array = new Float32Array(0)
  dimensions: Float32Array = new Float32Array(0)
  depths: Float32Array = new Float32Array(0)
  
  startPositions: Float32Array = new Float32Array(0)
  startDimensions: Float32Array = new Float32Array(0)

  positionDeltas: Float32Array = new Float32Array(0)
  dimensionDeltas: Float32Array = new Float32Array(0)

  scaleTransition?: ReturnType<typeof createTransition>
  rectanglesTransition?: ReturnType<typeof createTransition>

  selection: Float32Array = new Float32Array(0)
  mouseOverKey?: string

  private _onRectanglesChange = new Dispatcher()
  private _onScaleChange = new Dispatcher()
  private _onColourChange = new Dispatcher()

  private _keys: string[] = [] 
  private _indexByKey: Map<string, number> = new Map

  constructor (
    width : number, 
    height: number, 
    xScale = 1, 
    yScale = 1,
    fill: string,
    stroke: string,
    hoverFill?: string,
    hoverStroke?: string,
    xSpacing = 0
  ) {
    this.width = width
    this.height = height
    this.xScale = xScale
    this.yScale = yScale
    this.fill = fill
    this.stroke = stroke
    this.hoverFill = hoverFill
    this.hoverStroke = hoverStroke
    this.xSpacing = xSpacing
    this.tick = this.tick.bind(this)
  }

  public onRectanglesChange (handler) {
    this._onRectanglesChange.addHandler(handler)
  }

  public onScaleChange (handler) {
    this._onScaleChange.addHandler(handler)
  }

  public onColourChange (handler) {
    this._onColourChange.addHandler(handler)
  }

  setRectangles (rectangles: Rectangles) {
    const isArray = Array.isArray(rectangles)
    const size = this.size = isArray 
      ? rectangles.length 
      : Object.keys(rectangles).length
    const positions = this.positions = new Float32Array(size * 2)
    const dimensions = this.dimensions = new Float32Array(size * 2)

    this.startPositions = new Float32Array(size * 2)
    this.startDimensions = new Float32Array(size * 2)
    this.positionDeltas = new Float32Array(size * 2)
    this.dimensionDeltas = new Float32Array(size * 2)

    this.depths = new Float32Array(size)
    if (this.selection.length !== size) {
      this.selection = new Float32Array(size)
    }

    if (isArray) {
      rectangles.forEach((r, i) => {
        positions[i*2] = r.left
        positions[i*2+1] = this.height - r.top - r.height
        dimensions[i*2] = r.width
        dimensions[i*2+1] = r.height
      })
    } else {
      const keys = this._keys = Object.keys(rectangles)
      const indexByKey = this._indexByKey = new Map
   
      keys.forEach((k, i) => {
        indexByKey.set(k, i)
        const r = rectangles[k]
        positions[i*2] = r.left
        positions[i*2+1] = this.height - r.top - r.height
        dimensions[i*2] = r.width
        dimensions[i*2+1] = r.height
      })
    }
    this._onRectanglesChange.dispatch()
  }

  tick () {
    // stats.begin()
    if (this.rectanglesTransition || this.scaleTransition) {
      this.rectanglesTransition?.tick()
      this.scaleTransition?.tick()
      window.requestAnimationFrame(this.tick)
    }
    // stats.end()
  }

  handleMouseOver (key?: string) {
    if (key === undefined && this.mouseOverKey) {
      this.selection[this._indexByKey.get(this.mouseOverKey)!] = 0
      this.mouseOverKey = undefined
      this._onRectanglesChange.dispatch()
      return
    }
    
    const index = this._indexByKey.get(key!)!
    if (key === this.mouseOverKey) {
      return
    }
    if (this.mouseOverKey) {
      this.selection[this._indexByKey.get(this.mouseOverKey)!] = 0
    }
    this.mouseOverKey = key
    if (index >= 0) {
      this.selection[index] = 1
    }
    this._onRectanglesChange.dispatch()
  }

  private _updateFromArray(rectangles: Rectangle[]) : boolean {
    // if the first time being called, just set them directly
    if (this.positions.length !== rectangles.length * 2) {
      this.setRectangles(rectangles)
      return false
    }

    this.startPositions.set(this.positions)
    this.startDimensions.set(this.dimensions)
    rectangles.forEach((r, i) => {
      this.positionDeltas[i*2] = r.left - this.positions[i*2]
      this.positionDeltas[i*2+1] = 
        (this.height - r.top - r.height) - this.positions[i*2+1]
      this.dimensionDeltas[i*2] = r.width - this.dimensions[i*2]
      this.dimensionDeltas[i*2+1] = r.height - this.dimensions[i*2+1]
    })

    return true
  }

  private _updateFromObject(rectangles: Record<string, Rectangle>) : boolean {
    const newKeys = Object.keys(rectangles)
    const newKeyLength = newKeys.length
    const update : string[] = []

    const keyChecklist = new Map
    this._indexByKey.forEach((value, key) => {
      keyChecklist.set(key, null)
    })

    // now iterate the new keys, populating enter when
    // a new key is found, and deleting as we see
    // keys we already know
    const enter : string[] = []
    for (let i=0; i<newKeyLength; i++) {
      const key = newKeys[i]
      if (keyChecklist.has(key)) {
        update.push(key)
        keyChecklist.delete(key)
      } else {
        enter.push(key)
      }
    }

    // if any keys are left in the keyChecklist after this process,
    // it means they were not present in the new list of keys
    // and so should be removed. In this case, we rebuild all
    // the arrays rather than trying to shuffle data around
    if (keyChecklist.size || enter.length) {
      const newIndexByKey = new Map
      const size = this.size = newKeyLength
      const positions  = new Float32Array(size * 2)
      const dimensions  = new Float32Array(size * 2)

      const startPositions = this.startPositions = new Float32Array(size * 2)
      const startDimensions = this.startDimensions = new Float32Array(size * 2)
      const positionDeltas = this.positionDeltas = new Float32Array(size * 2)
      const dimensionDeltas = this.dimensionDeltas = new Float32Array(size * 2)
      this.depths = new Float32Array(size)

      const selection = new Float32Array(size)

      // i tracks the index in the newly created arrays
      let i = 0

      // first we fill it with the updates
      for (const key of update) {
        // j is the old index
        const j = this._indexByKey.get(key)!

        const ix = i*2
        const iy = i*2 + 1
        const jx = j*2
        const jy = j*2 + 1

        startPositions[ix] = positions[ix] = this.positions[jx]
        startPositions[iy] = positions[iy] = this.positions[jy]
        startDimensions[ix] = dimensions[ix] = this.dimensions[jx]
        startDimensions[iy] = dimensions[iy] = this.dimensions[jy]
        
        const r = rectangles[key]

        positionDeltas[ix] = r.left - this.positions[jx]
        positionDeltas[iy] = 
          (this.height - r.top - r.height) - this.positions[jy]
        dimensionDeltas[i*2] = r.width - this.dimensions[jx]
        dimensionDeltas[i*2+1] = r.height - this.dimensions[jy]

        newIndexByKey.set(key, i)

        selection[i] = this.selection[j]

        i++
      }

      for (const key of enter) {
        const ix = i*2
        const iy = i*2 + 1
        
        const r = rectangles[key]

        startPositions[ix] = positions[ix] = r.left
        startPositions[iy] = positions[iy] = this.height - r.top - r.height
        startDimensions[ix] = dimensions[ix] = r.width
        startDimensions[iy] = dimensions[iy] = r.height

        // for new rectangles, they enter at their position and
        // there are no deltas. They should already be at zero
        newIndexByKey.set(key, i)

        i++
      }

      this.positions = positions
      this.dimensions = dimensions
      this.selection = selection

      this._indexByKey = newIndexByKey
      this._keys = newKeys
    } else {
      this.startPositions.set(this.positions)
      this.startDimensions.set(this.dimensions)

      // if the set of keys didn't change, then just do the updates
      for (const [key, r] of Object.entries(rectangles)) {
        const j = this._indexByKey.get(key)!
        const jx = j*2
        const jy = j*2 + 1

        this.positionDeltas[jx] = r.left - this.positions[jx]
        this.positionDeltas[jy] = 
          (this.height - r.top - r.height) - this.positions[jy]
        this.dimensionDeltas[jx] = r.width - this.dimensions[jx]
        this.dimensionDeltas[jy] = r.height - this.dimensions[jy]
      }
    }

    return true
  }

  transitionToRectangles (rectangles: Rectangles, duration = 600) {
    if (!duration || duration === 0) {
      this.setRectangles(rectangles)
      return
    }

    let doTransition

    if (Array.isArray(rectangles)) {
      doTransition = this._updateFromArray(rectangles)
    } else {
      doTransition = this._updateFromObject(rectangles)
    }

    if (!doTransition) return
    
    this.rectanglesTransition = createTransition({
      startValue: 0,
      endValue: 1,
      duration,
      setter: (value) => {
        for (let i=0; i<this.positions.length; i++) {
          this.positions[i] = 
            this.startPositions[i] + (this.positionDeltas[i] * value)
          this.dimensions[i] = 
            this.startDimensions[i] + (this.dimensionDeltas[i] * value)
        }
        this._onRectanglesChange.dispatch()
      },
      onEnd: () => {
        delete this.rectanglesTransition
      }
    })

    // console.log('first fast rectangles tick called')
    this.tick()
  }

  _scaleHasChanged (
    xScale: number, 
    yScale: number, 
    xStart: number, 
    yStart: number
  ) {
    return xScale !== this.xScale || 
           yScale !== this.yScale || 
           xStart !== this.xStart || 
           yStart !== this.yStart
  }

  setScale (xScale: number, yScale: number, xStart: number, yStart: number) {
    if (this._scaleHasChanged(xScale, yScale, xStart, yStart)) {
      this.xScale = xScale
      this.yScale = yScale
      this.xStart = xStart
      this.yStart = yStart
      this._onScaleChange.dispatch()
    }
  }

  setColours (
    fill: string, 
    stroke: string, 
    hoverFill: string, 
    hoverStroke: string
  ) {
    this.fill = fill
    this.stroke = stroke
    this.hoverFill = hoverFill
    this.hoverStroke = hoverStroke
    this._onColourChange.dispatch()
  }

  transitionToScale (
    xScale: number, 
    yScale: number, 
    xStart: number, 
    yStart: number, 
    duration
  ) {
    if (!duration || duration === 0) {
      this.setScale(
        xScale,
        yScale,
        xStart,
        yStart
      )
      return
    }
    if (!this._scaleHasChanged(xScale, yScale, xStart, yStart)) {
      return
    }
    const start = {
      xScale: this.xScale,
      yScale: this.yScale,
      xStart: this.xStart,
      yStart: this.yStart
    }
    const end = {
      xScale,
      yScale,
      xStart,
      yStart
    }

    const interpolate = (start, end, value) => start + (end - start) * value

    this.scaleTransition = createTransition({
      startValue: 0,
      endValue: 1,
      duration,
      setter: (value) => {
        this.setScale(
          interpolate(start.xScale, end.xScale, value),
          interpolate(start.yScale, end.yScale, value),
          interpolate(start.xStart, end.xStart, value),
          interpolate(start.yStart, end.yStart, value)
        )
      },
      onEnd: () => {
        delete this.scaleTransition
      }
    })
    this.tick()
  }

  keyForIndex(index: number) {
    return this._keys[index]
  }
}