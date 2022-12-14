var be=Object.defineProperty;var ve=(t,e,n)=>e in t?be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var h=(t,e,n)=>(ve(t,typeof e!="symbol"?e+"":e,n),n);import{r as S}from"./index-408e2be5.js";import{j as C,F as ue,a as de}from"./jsx-runtime-7253b711.js";import"./index-8113b7ff.js";var we=function(t,e,n,r,i){var a=function(s){var c=1-s;return 3*c*c*s*t+3*c*s*s*n+s*s*s},l=function(s){var c=1-s;return 3*c*c*s*e+3*c*s*s*r+s*s*s},o=function(s){var c=1-s;return 3*(2*(s-1)*s+c*c)*t+3*(-s*s*s+2*c*s)*n};return function(s){var c=s,u,d,f,p,y,x;for(f=c,x=0;x<8;x++){if(p=a(f)-c,Math.abs(p)<i)return l(f);if(y=o(f),Math.abs(y)<1e-6)break;f=f-p/y}if(u=0,d=1,f=c,f<u)return l(u);if(f>d)return l(d);for(;u<d;){if(p=a(f),Math.abs(p-c)<i)return l(f);c>p?u=f:d=f,f=(d-u)*.5+u}return l(f)}};const Se=.02,Re=we(.42,0,.58,1,Se);function Q({startValue:t,endValue:e,setter:n,onEnd:r,duration:i=600,ease:a=Re,delay:l=0}){let o=0,s=new Date().getTime();const c=d=>{if(d<l)return t;const f=e-t;return t+f*a((d-l)/i)};return{tick:()=>{const d=new Date().getTime(),f=d-s;s=d,o+=f,o=Math.min(i+l,o),n(c(o)),o>=i+l&&r&&r()}}}class V{constructor(){h(this,"handlers",[])}addHandler(e){this.handlers.push(e)}dispatch(){for(const e of this.handlers)e()}}class Fe{constructor(e,n,r=1,i=1,a,l,o,s,c=0){h(this,"fill");h(this,"stroke");h(this,"hoverFill");h(this,"hoverStroke");h(this,"xScale");h(this,"yScale");h(this,"xStart",0);h(this,"yStart",0);h(this,"xSpacing",0);h(this,"width");h(this,"height");h(this,"size",0);h(this,"positions",new Float32Array(0));h(this,"dimensions",new Float32Array(0));h(this,"depths",new Float32Array(0));h(this,"startPositions",new Float32Array(0));h(this,"startDimensions",new Float32Array(0));h(this,"positionDeltas",new Float32Array(0));h(this,"dimensionDeltas",new Float32Array(0));h(this,"scaleTransition");h(this,"rectanglesTransition");h(this,"selection",new Float32Array(0));h(this,"mouseOverKey");h(this,"_onRectanglesChange",new V);h(this,"_onScaleChange",new V);h(this,"_onColourChange",new V);h(this,"_keys",[]);h(this,"_indexByKey",new Map);this.width=e,this.height=n,this.xScale=r,this.yScale=i,this.fill=a,this.stroke=l,this.hoverFill=o,this.hoverStroke=s,this.xSpacing=c,this.tick=this.tick.bind(this)}onRectanglesChange(e){this._onRectanglesChange.addHandler(e)}onScaleChange(e){this._onScaleChange.addHandler(e)}onColourChange(e){this._onColourChange.addHandler(e)}setRectangles(e){const n=Array.isArray(e),r=this.size=n?e.length:Object.keys(e).length,i=this.positions=new Float32Array(r*2),a=this.dimensions=new Float32Array(r*2);if(this.startPositions=new Float32Array(r*2),this.startDimensions=new Float32Array(r*2),this.positionDeltas=new Float32Array(r*2),this.dimensionDeltas=new Float32Array(r*2),this.depths=new Float32Array(r),this.selection.length!==r&&(this.selection=new Float32Array(r)),n)e.forEach((l,o)=>{i[o*2]=l.left,i[o*2+1]=this.height-l.top-l.height,a[o*2]=l.width,a[o*2+1]=l.height});else{const l=this._keys=Object.keys(e),o=this._indexByKey=new Map;l.forEach((s,c)=>{o.set(s,c);const u=e[s];i[c*2]=u.left,i[c*2+1]=this.height-u.top-u.height,a[c*2]=u.width,a[c*2+1]=u.height})}this._onRectanglesChange.dispatch()}tick(){var e,n;(this.rectanglesTransition||this.scaleTransition)&&((e=this.rectanglesTransition)==null||e.tick(),(n=this.scaleTransition)==null||n.tick(),window.requestAnimationFrame(this.tick))}handleMouseOver(e){if(e===void 0&&this.mouseOverKey){this.selection[this._indexByKey.get(this.mouseOverKey)]=0,this.mouseOverKey=void 0,this._onRectanglesChange.dispatch();return}const n=this._indexByKey.get(e);e!==this.mouseOverKey&&(this.mouseOverKey&&(this.selection[this._indexByKey.get(this.mouseOverKey)]=0),this.mouseOverKey=e,n>=0&&(this.selection[n]=1),this._onRectanglesChange.dispatch())}_updateFromArray(e){return this.positions.length!==e.length*2?(this.setRectangles(e),!1):(this.startPositions.set(this.positions),this.startDimensions.set(this.dimensions),e.forEach((n,r)=>{this.positionDeltas[r*2]=n.left-this.positions[r*2],this.positionDeltas[r*2+1]=this.height-n.top-n.height-this.positions[r*2+1],this.dimensionDeltas[r*2]=n.width-this.dimensions[r*2],this.dimensionDeltas[r*2+1]=n.height-this.dimensions[r*2+1]}),!0)}_updateFromObject(e){const n=Object.keys(e),r=n.length,i=[],a=new Map;this._indexByKey.forEach((o,s)=>{a.set(s,null)});const l=[];for(let o=0;o<r;o++){const s=n[o];a.has(s)?(i.push(s),a.delete(s)):l.push(s)}if(a.size||l.length){const o=new Map,s=this.size=r,c=new Float32Array(s*2),u=new Float32Array(s*2),d=this.startPositions=new Float32Array(s*2),f=this.startDimensions=new Float32Array(s*2),p=this.positionDeltas=new Float32Array(s*2),y=this.dimensionDeltas=new Float32Array(s*2);this.depths=new Float32Array(s);const x=new Float32Array(s);let m=0;for(const F of i){const v=this._indexByKey.get(F),b=m*2,g=m*2+1,k=v*2,$=v*2+1;d[b]=c[b]=this.positions[k],d[g]=c[g]=this.positions[$],f[b]=u[b]=this.dimensions[k],f[g]=u[g]=this.dimensions[$];const A=e[F];p[b]=A.left-this.positions[k],p[g]=this.height-A.top-A.height-this.positions[$],y[m*2]=A.width-this.dimensions[k],y[m*2+1]=A.height-this.dimensions[$],o.set(F,m),x[m]=this.selection[v],m++}for(const F of l){const v=m*2,b=m*2+1,g=e[F];d[v]=c[v]=g.left,d[b]=c[b]=this.height-g.top-g.height,f[v]=u[v]=g.width,f[b]=u[b]=g.height,o.set(F,m),m++}this.positions=c,this.dimensions=u,this.selection=x,this._indexByKey=o,this._keys=n}else{this.startPositions.set(this.positions),this.startDimensions.set(this.dimensions);for(const[o,s]of Object.entries(e)){const c=this._indexByKey.get(o),u=c*2,d=c*2+1;this.positionDeltas[u]=s.left-this.positions[u],this.positionDeltas[d]=this.height-s.top-s.height-this.positions[d],this.dimensionDeltas[u]=s.width-this.dimensions[u],this.dimensionDeltas[d]=s.height-this.dimensions[d]}}return!0}transitionToRectangles(e,n=600){if(!n||n===0){this.setRectangles(e);return}let r;Array.isArray(e)?r=this._updateFromArray(e):r=this._updateFromObject(e),r&&(this.rectanglesTransition=Q({startValue:0,endValue:1,duration:n,setter:i=>{for(let a=0;a<this.positions.length;a++)this.positions[a]=this.startPositions[a]+this.positionDeltas[a]*i,this.dimensions[a]=this.startDimensions[a]+this.dimensionDeltas[a]*i;this._onRectanglesChange.dispatch()},onEnd:()=>{delete this.rectanglesTransition}}),this.tick())}_scaleHasChanged(e,n,r,i){return e!==this.xScale||n!==this.yScale||r!==this.xStart||i!==this.yStart}setScale(e,n,r,i){this._scaleHasChanged(e,n,r,i)&&(this.xScale=e,this.yScale=n,this.xStart=r,this.yStart=i,this._onScaleChange.dispatch())}setColours(e,n,r,i){this.fill=e,this.stroke=n,this.hoverFill=r,this.hoverStroke=i,this._onColourChange.dispatch()}transitionToScale(e,n,r,i,a){if(!a||a===0){this.setScale(e,n,r,i);return}if(!this._scaleHasChanged(e,n,r,i))return;const l={xScale:this.xScale,yScale:this.yScale,xStart:this.xStart,yStart:this.yStart},o={xScale:e,yScale:n,xStart:r,yStart:i},s=(c,u,d)=>c+(u-c)*d;this.scaleTransition=Q({startValue:0,endValue:1,duration:a,setter:c=>{this.setScale(s(l.xScale,o.xScale,c),s(l.yScale,o.yScale,c),s(l.xStart,o.xStart,c),s(l.yStart,o.yStart,c))},onEnd:()=>{delete this.scaleTransition}}),this.tick()}keyForIndex(e){return this._keys[e]}}function Y(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function ge(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function M(){}var E=.7,q=1/E,L="\\s*([+-]?\\d+)\\s*",P="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",R="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ke=/^#([0-9a-f]{3,8})$/,Ae=new RegExp(`^rgb\\(${L},${L},${L}\\)$`),Ce=new RegExp(`^rgb\\(${R},${R},${R}\\)$`),Te=new RegExp(`^rgba\\(${L},${L},${L},${P}\\)$`),Be=new RegExp(`^rgba\\(${R},${R},${R},${P}\\)$`),$e=new RegExp(`^hsl\\(${P},${R},${R}\\)$`),Le=new RegExp(`^hsla\\(${P},${R},${R},${P}\\)$`),Z={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Y(M,G,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:ee,formatHex:ee,formatHex8:De,formatHsl:Ee,formatRgb:te,toString:te});function ee(){return this.rgb().formatHex()}function De(){return this.rgb().formatHex8()}function Ee(){return xe(this).formatHsl()}function te(){return this.rgb().formatRgb()}function G(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=ke.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?ne(e):n===3?new _(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?O(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?O(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=Ae.exec(t))?new _(e[1],e[2],e[3],1):(e=Ce.exec(t))?new _(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Te.exec(t))?O(e[1],e[2],e[3],e[4]):(e=Be.exec(t))?O(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=$e.exec(t))?se(e[1],e[2]/100,e[3]/100,1):(e=Le.exec(t))?se(e[1],e[2]/100,e[3]/100,e[4]):Z.hasOwnProperty(t)?ne(Z[t]):t==="transparent"?new _(NaN,NaN,NaN,0):null}function ne(t){return new _(t>>16&255,t>>8&255,t&255,1)}function O(t,e,n,r){return r<=0&&(t=e=n=NaN),new _(t,e,n,r)}function Pe(t){return t instanceof M||(t=G(t)),t?(t=t.rgb(),new _(t.r,t.g,t.b,t.opacity)):new _}function D(t,e,n,r){return arguments.length===1?Pe(t):new _(t,e,n,r??1)}function _(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}Y(_,D,ge(M,{brighter(t){return t=t==null?q:Math.pow(q,t),new _(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?E:Math.pow(E,t),new _(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new _(B(this.r),B(this.g),B(this.b),K(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:re,formatHex:re,formatHex8:Me,formatRgb:ie,toString:ie}));function re(){return`#${T(this.r)}${T(this.g)}${T(this.b)}`}function Me(){return`#${T(this.r)}${T(this.g)}${T(this.b)}${T((isNaN(this.opacity)?1:this.opacity)*255)}`}function ie(){const t=K(this.opacity);return`${t===1?"rgb(":"rgba("}${B(this.r)}, ${B(this.g)}, ${B(this.b)}${t===1?")":`, ${t})`}`}function K(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function B(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function T(t){return t=B(t),(t<16?"0":"")+t.toString(16)}function se(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new w(t,e,n,r)}function xe(t){if(t instanceof w)return new w(t.h,t.s,t.l,t.opacity);if(t instanceof M||(t=G(t)),!t)return new w;if(t instanceof w)return t;t=t.rgb();var e=t.r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),a=Math.max(e,n,r),l=NaN,o=a-i,s=(a+i)/2;return o?(e===a?l=(n-r)/o+(n<r)*6:n===a?l=(r-e)/o+2:l=(e-n)/o+4,o/=s<.5?a+i:2-a-i,l*=60):o=s>0&&s<1?0:l,new w(l,o,s,t.opacity)}function Oe(t,e,n,r){return arguments.length===1?xe(t):new w(t,e,n,r??1)}function w(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}Y(w,Oe,ge(M,{brighter(t){return t=t==null?q:Math.pow(q,t),new w(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?E:Math.pow(E,t),new w(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new _(U(t>=240?t-240:t+120,i,r),U(t,i,r),U(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new w(oe(this.h),N(this.s),N(this.l),K(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=K(this.opacity);return`${t===1?"hsl(":"hsla("}${oe(this.h)}, ${N(this.s)*100}%, ${N(this.l)*100}%${t===1?")":`, ${t})`}`}}));function oe(t){return t=(t||0)%360,t<0?t+360:t}function N(t){return Math.max(0,Math.min(1,t||0))}function U(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}const Ne=`uniform vec2 u_canvasDimensions;\r
uniform mediump vec4 u_scaling;\r
\r
attribute vec4 a_position;\r
attribute vec4 a_texcoord;\r
attribute float a_index;\r
attribute float a_selection;\r
\r
varying vec4 v_position;\r
varying vec4 v_texcoord;\r
varying vec3 v_colour;\r
varying float v_selection;\r
\r
vec3 encodeObject(float id) {\r
   id += 1.0;\r
   int b = int(mod(id, 255.0));\r
   int r = int(id) / 255 / 255;\r
   int g = (int(id) - b - r * 255 * 255) / 255;\r
   return vec3(r, g, b) / 255.0;\r
}\r
\r
void main() {\r
   gl_Position = vec4(\r
      (u_scaling.x * (a_position.x - u_scaling.z) - a_position.w) / (u_canvasDimensions.x / 2.0) - 1.0,\r
      u_scaling.y * (a_position.y - u_scaling.w) / (u_canvasDimensions.y / 2.0) - 1.0,\r
      a_position.z,\r
      1.0\r
   );\r
   v_texcoord = a_texcoord;\r
   v_colour = encodeObject(a_index);\r
   v_selection = a_selection;\r
}`,He=`precision mediump float;\r
\r
uniform float u_renderType; // colours or rectangle ids\r
uniform mediump vec4 u_scaling;\r
uniform vec4 u_fill;\r
uniform vec4 u_stroke;\r
uniform vec4 u_hover_fill;\r
uniform vec4 u_hover_stroke;\r
\r
// Passed in from the vertex shader.\r
varying vec4 v_texcoord;\r
varying vec3 v_colour;\r
varying float v_selection;\r
\r
void main() {\r
  // renderType == 1 means id map (one colour per rectangle)\r
  if (u_renderType == 1.0) {\r
    gl_FragColor.rgb = v_colour;  //= vec4(0.0, 0.0, 0.0, 1.0);\r
    gl_FragColor.a = 1.0;\r
  } else {\r
    float xBorderWidth = 1.0 / v_texcoord.z / u_scaling.x;\r
    float yBorderWidth = 1.0 / v_texcoord.w / u_scaling.y;\r
\r
    float minX = xBorderWidth;\r
    float maxX = 1.0 - xBorderWidth;\r
    float minY = yBorderWidth;\r
    float maxY = 1.0 - yBorderWidth;\r
\r
    if (\r
      v_texcoord.y > minY && \r
      v_texcoord.x > minX && \r
      v_texcoord.y < maxY && \r
      v_texcoord.x < maxX\r
    ) {\r
      if (v_selection == 1.0) { // i.e. hover\r
        gl_FragColor = u_hover_fill;\r
      } else {\r
        gl_FragColor = u_fill;\r
      }\r
    } else {\r
      if (v_selection == 1.0) { // i.e. hover\r
        gl_FragColor = u_hover_stroke;\r
      } else {\r
        gl_FragColor = u_stroke;\r
      }\r
    }\r
  }\r
}`;function ae(t,e,n){const r=t.createShader(e);if(!r)throw new Error("Shader creation failed!");if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw new Error("An error occurred compiling the shaders"+t.getShaderInfoLog(r));return r}function Ie(t){const e=ae(t,t.VERTEX_SHADER,Ne),n=ae(t,t.FRAGMENT_SHADER,He);return{vertexShader:e,fragmentShader:n}}function je(t,e){const n=t.createProgram();if(!n)throw new Error("Failed to create program");for(const r of e)t.attachShader(n,r);return t.linkProgram(n),n}function H(t,e,n){const r=t.getAttribLocation(e,n);if(r===-1)throw new Error("Location -1 error when trying to get attribute:"+n);const i=t.createBuffer();if(!i)throw new Error("Failed to create webgl buffer:"+n);return t.bindBuffer(t.ARRAY_BUFFER,i),{location:r,buffer:i}}function I(t,e,n,r){const{location:i,buffer:a}=e;t.enableVertexAttribArray(i),t.vertexAttribPointer(i,r,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,a)}const le=1,ce=1;class he{constructor(e,n,r=!1){h(this,"_canvas");h(this,"_layout");h(this,"_canvasDimensionsLocation");h(this,"_scalingLocation");h(this,"_renderTypeLocation");h(this,"_fillLocation");h(this,"_strokeLocation");h(this,"_hoverFillLocation");h(this,"_hoverStrokeLocation");h(this,"_gl");h(this,"_program");h(this,"_position");h(this,"_texcoord");h(this,"_indices");h(this,"_selection");h(this,"_numberOfTriangles",0);h(this,"_needsUpdate",!1);this._canvas=e,this._layout=n;const i=this._canvas.getContext("webgl",{preserveDrawingBuffer:!0,antialias:!1});if(!i)throw new Error("Unable to create webgl rendering context!");this._gl=i,i.enable(i.DEPTH_TEST);const{vertexShader:a,fragmentShader:l}=Ie(i),o=this._program=je(i,[a,l]);i.useProgram(o),this._position=H(i,o,"a_position"),this._texcoord=H(i,o,"a_texcoord"),this._indices=H(i,o,"a_index"),this._selection=H(i,o,"a_selection"),this._canvasDimensionsLocation=i.getUniformLocation(o,"u_canvasDimensions"),this._scalingLocation=i.getUniformLocation(o,"u_scaling"),this._gl.uniform2f(this._canvasDimensionsLocation,e.clientWidth,e.clientHeight),this._setScaling(),this._renderTypeLocation=i.getUniformLocation(o,"u_renderType"),this._fillLocation=i.getUniformLocation(o,"u_fill"),this._strokeLocation=i.getUniformLocation(o,"u_stroke"),this._hoverFillLocation=i.getUniformLocation(o,"u_hover_fill"),this._hoverStrokeLocation=i.getUniformLocation(o,"u_hover_stroke"),this._gl.uniform1f(this._renderTypeLocation,r?1:0);const s=window;s.rectGl=this,n.onRectanglesChange(()=>{this._populateBuffers(),this._draw()}),n.onScaleChange(()=>{this._setScaling(),this._draw()}),n.onColourChange(()=>{this._setColours(),this._draw()})}_setColours(){const e=D(this._layout.fill),n=D(this._layout.stroke),r=this._layout.hoverFill?D(this._layout.hoverFill):e,i=this._layout.hoverStroke?D(this._layout.hoverStroke):n;this._gl.uniform4f(this._fillLocation,e.r/255,e.g/255,e.b/255,e.opacity),this._gl.uniform4f(this._strokeLocation,n.r/255,n.g/255,n.b/255,n.opacity),this._gl.uniform4f(this._hoverFillLocation,r.r/255,r.g/255,r.b/255,r.opacity),this._gl.uniform4f(this._hoverStrokeLocation,i.r/255,i.g/255,i.b/255,i.opacity)}_setScaling(){this._layout&&this._scalingLocation&&this._gl.uniform4f(this._scalingLocation,this._layout.xScale,this._layout.yScale,this._layout.xStart,this._layout.yStart)}_populatePositionBuffer(e,n,r){const i=this._gl,a=new Float32Array(e.length/2*6*4);let l=0;for(let o=0;o<r.length;o++){let[s,c]=e.slice(o*2,o*2+2);s*=le,c*=ce;let[u,d]=n.slice(o*2,o*2+2);u*=le,d*=ce;const f=r[o],p=s+u,y=c+d,x=this._layout.xSpacing,m=[s,c,f,0,p,c,f,x,s,y,f,0,p,y,f,x,s,y,f,0,p,c,f,x];a.set(m,l),l+=24}return I(i,this._position,a,4),a.length/4}_populateTexcoordsBuffer(e){const n=e.length/2,r=this._gl,i=new Float32Array(n*24);let a=0;for(let l=0;l<n;l++){const[o,s]=e.slice(l*2,l*2+2),c=[0,0,o,s,1,0,o,s,0,1,o,s,1,1,o,s,0,1,o,s,1,0,o,s];i.set(c,a),a+=24}I(r,this._texcoord,i,4)}_populateIndicesBuffer(e){const n=this._gl,r=new Float32Array(e*6);let i=0;for(let a=0;a<e;a++){const l=[a,a,a,a,a,a];r.set(l,i),i+=6}I(n,this._indices,r,1)}_populateSelectionBuffer(e){const n=this._gl,r=e.length,i=new Float32Array(r*6);let a=0;for(let l=0;l<r;l++){const o=e[l],s=[o,o,o,o,o,o];i.set(s,a),a+=6}I(n,this._selection,i,1)}_populateBuffers(){const e=this._layout;!e.positions||!e.dimensions||!e.depths||(this._numberOfTriangles=this._populatePositionBuffer(e.positions,e.dimensions,e.depths),this._populateTexcoordsBuffer(e.dimensions),this._populateIndicesBuffer(e.size),this._populateSelectionBuffer(e.selection))}_draw(){const e=this._gl;e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,this._numberOfTriangles)}remove(){this._canvas.remove()}colourAtPixel(e,n){const r=this._gl,i=new Uint8Array(4);return r.readPixels(e,n,1,1,r.RGBA,r.UNSIGNED_BYTE,i),i}keyAtPixel(e,n){const r=this.colourAtPixel(e,n),i=r[2]+r[1]*255+r[0]*255*255-1;return this._layout.keyForIndex(i)}}const j=({fill:t="gray",stroke:e="black",hoverFill:n,hoverStroke:r,width:i,height:a,rectangles:l,xScale:o=1,yScale:s=1,xStart:c=0,yStart:u=0,xSpacing:d=0,transitionDuration:f})=>{const p=S.exports.useRef(null),y=S.exports.useRef(null),x=S.exports.useRef(),m=S.exports.useRef(),F=S.exports.useRef();S.exports.useEffect(()=>{!p.current||!y.current||x.current&&m.current||(x.current=new Fe(i,a,o,s,t,e,n,r,d),m.current=new he(p.current,x.current),F.current=new he(y.current,x.current,!0))},[p.current,y.current]),S.exports.useEffect(()=>{var g;!m.current||(g=x.current)==null||g.transitionToRectangles(l,f)},[l,i,a]),S.exports.useEffect(()=>{var g;!m.current||(g=x.current)==null||g.transitionToScale(o,s,c,u,f)},[o,s,c,u]),S.exports.useEffect(()=>{!x.current||x.current.setColours(t,e,n,r)},[t,e,n,r]);const v=i*window.devicePixelRatio,b=a*window.devicePixelRatio;return C(ue,{children:C("div",{style:{width:i,height:a},children:de("div",{style:{position:"absolute"},children:[C("canvas",{ref:p,width:v,height:b,onMouseMove:g=>{var X,J;const k=g.target.getBoundingClientRect(),$=(g.pageX-k.left)*window.devicePixelRatio,A=(k.height-(g.pageY-k.top))*window.devicePixelRatio,_e=(X=F.current)==null?void 0:X.keyAtPixel($,A);(J=x.current)==null||J.handleMouseOver(_e)},style:{width:i,height:a,backgroundColor:"transparent",position:"absolute"}}),C("canvas",{ref:y,width:v,height:b,style:{width:i,height:a,visibility:"hidden",position:"absolute"}})]})})})},pe=j;try{j.displayName="FastRectangles",j.__docgenInfo={description:"",displayName:"FastRectangles",props:{fill:{defaultValue:{value:"gray"},description:"",name:"fill",required:!1,type:{name:"string"}},stroke:{defaultValue:{value:"black"},description:"",name:"stroke",required:!1,type:{name:"string"}},hoverFill:{defaultValue:null,description:"",name:"hoverFill",required:!1,type:{name:"string"}},hoverStroke:{defaultValue:null,description:"",name:"hoverStroke",required:!1,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"number"}},xScale:{defaultValue:{value:"1"},description:"",name:"xScale",required:!1,type:{name:"number"}},yScale:{defaultValue:{value:"1"},description:"",name:"yScale",required:!1,type:{name:"number"}},xStart:{defaultValue:{value:"0"},description:"",name:"xStart",required:!1,type:{name:"number"}},yStart:{defaultValue:{value:"0"},description:"",name:"yStart",required:!1,type:{name:"number"}},xSpacing:{defaultValue:{value:"0"},description:"",name:"xSpacing",required:!1,type:{name:"number"}},transitionDuration:{defaultValue:null,description:"",name:"transitionDuration",required:!1,type:{name:"number"}},rectangles:{defaultValue:null,description:"",name:"rectangles",required:!0,type:{name:"Rectangles"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/react/FastRectangles.tsx#FastRectangles"]={docgenInfo:j.__docgenInfo,name:"FastRectangles",path:"src/react/FastRectangles.tsx#FastRectangles"})}catch{}const We={title:"FastRectangles",component:pe,parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react'
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
`,locationsMap:{primary:{startLoc:{col:62,line:54},endLoc:{col:1,line:72},startBody:{col:62,line:54},endBody:{col:1,line:72}}}},layout:"fullscreen"},argTypes:{xScale:{control:{type:"range",min:.1,max:5,step:.01}},yScale:{control:{type:"range",min:.1,max:5,step:.01}},xStart:{control:{type:"range",min:-400,max:400,step:1}},yStart:{control:{type:"range",min:-400,max:400,step:1}},fill:{control:"color"},stroke:{control:"color"},hoverFill:{control:"color"},hoverStroke:{control:"color"}},args:{xScale:1,yScale:1,xStart:0,yStart:0,fill:"red",stroke:"blue",hoverFill:"green",hoverStroke:"blue"}},z=400,W=400,fe=()=>({width:Math.random()*z/4,height:Math.random()*W/4,left:Math.random()*z*3/4,top:Math.random()*W*3/4}),me=[],ye=[],qe=100;for(let t=0;t<qe;t++)me.push(fe()),ye.push(fe());const Ye=t=>{const e=[me,ye],[n,r]=S.exports.useState(0);return de(ue,{children:[C("button",{onClick:()=>{r(1-n)},children:"toggle"}),C("br",{}),C(pe,{...t,width:z,height:W,rectangles:e[n]})]})},Ge=["Primary"];export{Ye as Primary,Ge as __namedExportsOrder,We as default};
//# sourceMappingURL=FastRectangles.stories-9c71227f.js.map
