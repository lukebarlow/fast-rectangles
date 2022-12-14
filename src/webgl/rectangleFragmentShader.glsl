precision mediump float;

uniform float u_renderType; // colours or rectangle ids
uniform mediump vec4 u_scaling;
uniform vec4 u_fill;
uniform vec4 u_stroke;
uniform vec4 u_hover_fill;
uniform vec4 u_hover_stroke;

// Passed in from the vertex shader.
varying vec4 v_texcoord;
varying vec3 v_colour;
varying float v_selection;

void main() {
  // renderType == 1 means id map (one colour per rectangle)
  if (u_renderType == 1.0) {
    gl_FragColor.rgb = v_colour;  //= vec4(0.0, 0.0, 0.0, 1.0);
    gl_FragColor.a = 1.0;
  } else {
    float xBorderWidth = 1.0 / v_texcoord.z / u_scaling.x;
    float yBorderWidth = 1.0 / v_texcoord.w / u_scaling.y;

    float minX = xBorderWidth;
    float maxX = 1.0 - xBorderWidth;
    float minY = yBorderWidth;
    float maxY = 1.0 - yBorderWidth;

    if (
      v_texcoord.y > minY && 
      v_texcoord.x > minX && 
      v_texcoord.y < maxY && 
      v_texcoord.x < maxX
    ) {
      if (v_selection == 1.0) { // i.e. hover
        gl_FragColor = u_hover_fill;
      } else {
        gl_FragColor = u_fill;
      }
    } else {
      if (v_selection == 1.0) { // i.e. hover
        gl_FragColor = u_hover_stroke;
      } else {
        gl_FragColor = u_stroke;
      }
    }
  }
}