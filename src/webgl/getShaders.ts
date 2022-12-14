import vertexShaderText from './rectangleVertexShader.glsl?raw'
import fragmentShaderText from './rectangleFragmentShader.glsl?raw'

function createShader (
  gl: WebGLRenderingContext, 
  type: number, 
  text: string
) {
  const shader = gl.createShader(type) // create shader
  if (!shader) {
    throw new Error('Shader creation failed!')
  }
  gl.shaderSource(shader, text) // set the source
  gl.compileShader(shader) // compile
  // check that it compiled correctly
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(
      'An error occurred compiling the shaders' + gl.getShaderInfoLog(shader)
    )
  }
  return shader
}

export default function getShaders (gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText)
  const fragmentShader = createShader(
    gl, gl.FRAGMENT_SHADER, fragmentShaderText
  )
  return { vertexShader, fragmentShader }
}
