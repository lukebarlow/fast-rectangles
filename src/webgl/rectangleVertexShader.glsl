uniform vec2 u_canvasDimensions;
uniform mediump vec4 u_scaling;

attribute vec4 a_position;
attribute vec4 a_texcoord;
attribute float a_index;
attribute float a_selection;

varying vec4 v_position;
varying vec4 v_texcoord;
varying vec3 v_colour;
varying float v_selection;

vec3 encodeObject(float id) {
   id += 1.0;
   int b = int(mod(id, 255.0));
   int r = int(id) / 255 / 255;
   int g = (int(id) - b - r * 255 * 255) / 255;
   return vec3(r, g, b) / 255.0;
}

void main() {
   gl_Position = vec4(
      (u_scaling.x * (a_position.x - u_scaling.z) - a_position.w) / (u_canvasDimensions.x / 2.0) - 1.0,
      u_scaling.y * (a_position.y - u_scaling.w) / (u_canvasDimensions.y / 2.0) - 1.0,
      a_position.z,
      1.0
   );
   v_texcoord = a_texcoord;
   v_colour = encodeObject(a_index);
   v_selection = a_selection;
}