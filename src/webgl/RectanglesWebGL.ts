import { rgb } from 'd3-color'

import RectanglesLayout from '../layout/RectanglesLayout'
import getShaders from './getShaders'

type LocationAndBuffer = {
  location: number
  buffer: WebGLBuffer
}

function createProgram (
  gl: WebGLRenderingContext, 
  shaders: WebGLShader[]
) {
  const shaderProgram = gl.createProgram()
  if (!shaderProgram) {
    throw new Error('Failed to create program')
  }
  for (const shader of shaders) {
    gl.attachShader(shaderProgram, shader)
  }
  gl.linkProgram(shaderProgram)
  return shaderProgram
}

function createBufferAndLocation (
  gl: WebGLRenderingContext, 
  program: WebGLProgram, 
  name: string
) : LocationAndBuffer {
  const location = gl.getAttribLocation(program, name)

  if (location === -1) {
    throw new Error('Location -1 error when trying to get attribute:' + name)
  }

  const buffer = gl.createBuffer()
  if (!buffer) {
    throw new Error('Failed to create webgl buffer:' + name)
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  return {
    location,
    buffer
  }
}

function populateBuffer (
  gl: WebGLRenderingContext,
  locationAndBuffer: LocationAndBuffer,
  contents: Float32Array,
  size: number
) {
  const { location, buffer } = locationAndBuffer

  gl.enableVertexAttribArray(location)
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)

  gl.bufferData(gl.ARRAY_BUFFER, contents, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
}

const xScale = 1
const yScale = 1

export default class RectanglesWebGL {
  _canvas: HTMLCanvasElement
  _layout: RectanglesLayout
  _canvasDimensionsLocation: WebGLUniformLocation
  _scalingLocation: WebGLUniformLocation
  _renderTypeLocation: WebGLUniformLocation
  _fillLocation: WebGLUniformLocation
  _strokeLocation: WebGLUniformLocation
  _hoverFillLocation: WebGLUniformLocation
  _hoverStrokeLocation: WebGLUniformLocation
  _gl: WebGLRenderingContext
  _program: WebGLProgram
  _position: LocationAndBuffer
  _texcoord: LocationAndBuffer
  _indices: LocationAndBuffer
  _selection: LocationAndBuffer
  _numberOfTriangles = 0

  /* the mouse detection version is only updated when needed */
  _needsUpdate = false 

  constructor (
    canvas: HTMLCanvasElement, 
    layout: RectanglesLayout,
    mouseDetection = false
  ) {
    this._canvas = canvas
    this._layout = layout
    const gl = this._canvas.getContext(
      'webgl', 
      { preserveDrawingBuffer: true, antialias: false }
    ) 
    // const gl = this._canvas.getContext('webgl') 
    if (!gl) {
      throw new Error('Unable to create webgl rendering context!')
    }
    
    this._gl = gl

    gl.enable(gl.DEPTH_TEST)
    const { vertexShader, fragmentShader } = getShaders(gl)
    const program = this._program = createProgram(
      gl, 
      [vertexShader, fragmentShader]
    )
    gl.useProgram(program)

    this._position = createBufferAndLocation(gl, program, 'a_position')
    this._texcoord = createBufferAndLocation(gl, program, 'a_texcoord')
    this._indices = createBufferAndLocation(gl, program, 'a_index')
    this._selection = createBufferAndLocation(gl, program, 'a_selection')
    this._canvasDimensionsLocation = gl.getUniformLocation(
      program, 
      'u_canvasDimensions'
    )
    this._scalingLocation = gl.getUniformLocation(program, 'u_scaling')
    this._gl.uniform2f(
      this._canvasDimensionsLocation, 
      canvas.clientWidth, 
      canvas.clientHeight
    )
    this._setScaling()
    this._renderTypeLocation = gl.getUniformLocation(program, 'u_renderType')
    this._fillLocation = gl.getUniformLocation(program, 'u_fill')
    this._strokeLocation = gl.getUniformLocation(program, 'u_stroke')
    this._hoverFillLocation = gl.getUniformLocation(program, 'u_hover_fill')
    this._hoverStrokeLocation = gl.getUniformLocation(
      program, 'u_hover_stroke'
    )

    this._gl.uniform1f(this._renderTypeLocation, mouseDetection ? 1 : 0)

    const w = window as any
    w.rectGl = this

    layout.onRectanglesChange(() => {
      this._populateBuffers()
      this._draw()
    })

    layout.onScaleChange(() => {
      this._setScaling()
      this._draw()
    })

    layout.onColourChange(() => {
      this._setColours()
      this._draw()
    })
  }
  
  private _setColours () {
    const fill = rgb(this._layout.fill)
    const stroke = rgb(this._layout.stroke)
    const hoverFill = this._layout.hoverFill 
      ? rgb(this._layout.hoverFill) 
      : fill
    const hoverStroke = this._layout.hoverStroke 
      ? rgb(this._layout.hoverStroke) 
      : stroke

    this._gl.uniform4f(
      this._fillLocation, 
      fill.r/255, 
      fill.g/255, 
      fill.b/255, 
      fill.opacity
    )
    this._gl.uniform4f(
      this._strokeLocation, 
      stroke.r/255, 
      stroke.g/255, 
      stroke.b/255, 
      stroke.opacity
    )
    this._gl.uniform4f(
      this._hoverFillLocation, 
      hoverFill.r/255, 
      hoverFill.g/255, 
      hoverFill.b/255, 
      hoverFill.opacity
    )
    this._gl.uniform4f(
      this._hoverStrokeLocation,
      hoverStroke.r/255,
      hoverStroke.g/255,
      hoverStroke.b/255,
      hoverStroke.opacity
    )
  }

  private _setScaling () {
    if (this._layout && this._scalingLocation) {
      this._gl.uniform4f(
        this._scalingLocation,
        this._layout.xScale,
        this._layout.yScale,
        this._layout.xStart,
        this._layout.yStart  
      )
    }
  }

  private _populatePositionBuffer (
    positions: Float32Array,
    dimensions: Float32Array,
    depths: Float32Array, 
    // visibles: Float32Array
  ) {
    const gl = this._gl
    const vertices = new Float32Array(positions.length / 2 * 6 * 4)

    let j = 0
    for (let i = 0; i < depths.length; i++) {
      // const rotation = 0
      let [x, y] = positions.slice(i * 2, i * 2 + 2)
      x *= xScale
      y *= yScale

      let [width, height] = dimensions.slice(i *2, i * 2 + 2)
      width *= xScale
      height *= yScale

      const depth = depths[i]

      /*

  The coordinates are those of two triangles, arranged
  in the following way, where the numbers are the indices
  of the x, y pairs

          3  5 _____  4
          |\   \    |
          | \   \   |
          |  \   \  |
          |   \   \ |
          |____\   \|
          1     2    6

      */

      const xr = x + width // x co-ord of right
      const yt = y + height // y co-ord of top

      // the w component is used as a binary
      // to indicate for each vertex if it's on the right
      // hand side of the rectangle, and therefore
      // subject to being moved for rectangle spacing

      const xSpacing = this._layout.xSpacing

      const a = [
        x,  // 1x
        y,  // 1y
        depth,
        0,
        xr, // 2x
        y,  // 2y
        depth,
        xSpacing,
        x,  // 3x
        yt, // 3y
        depth,
        0,

        xr, // 4x
        yt, // 4y
        depth,
        xSpacing,

        x,  // 5x
        yt, // 5y
        depth,
        0,

        xr, // 6x
        y,  // 6y
        depth,
        xSpacing
      ]

      vertices.set(a, j)
      j += 24
    }

    // const w = window as any
    // w.vertices = vertices
    // Turn on the position attribute and populate the position buffer

    populateBuffer(gl, this._position, vertices, 4)
    return vertices.length / 4
  }

  private _populateTexcoordsBuffer (dimensions: Float32Array) {
    const size = dimensions.length / 2
    const gl = this._gl
    const coords = new Float32Array(size * 24)

    let j = 0

    for (let i = 0; i < size; i++) {
      const [w, h] = dimensions.slice(i*2, i*2+2)
      const a = [
        0.0, 0.0, w, h,
        1.0, 0.0, w, h,
        0.0, 1.0, w, h,
        1.0, 1.0, w, h,
        0.0, 1.0, w, h,
        1.0, 0.0, w, h
      ]
      coords.set(a, j)
      j += 24
    }

    populateBuffer(gl, this._texcoord, coords, 4)
  }

  private _populateIndicesBuffer (size: number) {
    const gl = this._gl
    const indices = new Float32Array(size * 6)
    let j = 0
    for (let i = 0; i < size; i++) {
      const a = [i, i, i, i, i, i]
      indices.set(a, j)
      j += 6
    }
    populateBuffer(gl, this._indices, indices, 1)
  }

  private _populateSelectionBuffer (selectionStates: Float32Array) {
    const gl = this._gl
    const size = selectionStates.length
    const selection = new Float32Array(size * 6)
    let j = 0
    for (let i = 0; i < size; i++) {
      const s = selectionStates[i]
      const a = [s, s, s, s, s, s]
      selection.set(a, j)
      j += 6
    }
    populateBuffer(gl, this._selection, selection, 1)
  }

  /* this method should be called after height and/or width of the notesLayout
  are updated, and handles the resizing of the canvas */
  // resize () {
  //   this._setCanvasSize()
  //   const gl = this._gl
  //   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  //   this._setProjectionMatrix(gl, this._program)
  // }

  private _populateBuffers () {
    const layout = this._layout

    if (!layout.positions || !layout.dimensions || !layout.depths) {
      return
    }

    this._numberOfTriangles = this._populatePositionBuffer(
      layout.positions,
      layout.dimensions,
      layout.depths
    )
    this._populateTexcoordsBuffer(layout.dimensions)
    this._populateIndicesBuffer(layout.size)
    this._populateSelectionBuffer(layout.selection)
  }

  private _draw() {
    const gl = this._gl
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, this._numberOfTriangles)
  }

  remove () {
    this._canvas.remove()
  }

  colourAtPixel (x: number, y: number) {
    const gl = this._gl
    const colour = new Uint8Array(4)
    gl.readPixels(
      x,
      y,
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      colour
    )
    return colour
  }

  keyAtPixel (x:number, y:number) {
    const colour = this.colourAtPixel(x, y)
    const id = (colour[2]  + colour[1] * 255 + colour[0] * 255 * 255) - 1
    return this._layout.keyForIndex(id)
  }
}
