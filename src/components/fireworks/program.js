export const Program = function (gl, def) {
  this.gl = gl;
  this.attributes = {};
  this.uniforms = {};

  var vs = def.vs
    ? this._shaderFromString(gl.VERTEX_SHADER, def.vs)
    : this._shaderFromId(def.vsId);
  var fs = def.fs
    ? this._shaderFromString(gl.FRAGMENT_SHADER, def.fs)
    : this._shaderFromId(def.fsId);

  this.program = gl.createProgram();
  gl.attachShader(this.program, vs);
  gl.attachShader(this.program, fs);
  gl.linkProgram(this.program);

  if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
    throw new Error("Could not link the shader program");
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  (def.attributes || []).forEach(function (name) {
    this.attributes[name] = gl.getAttribLocation(this.program, name);
  }, this);

  (def.uniforms || []).forEach(function (name) {
    this.uniforms[name] = gl.getUniformLocation(this.program, name);
  }, this);
};

Program.prototype.use = function () {
  this.gl.useProgram(this.program);

  for (var p in this.attributes) {
    this.gl.enableVertexAttribArray(this.attributes[p]);
  }
};

Program.prototype._shaderFromId = function (id) {
  var node = document.querySelector("#" + id);
  if (!node) {
    throw new Error("Cannot find shader for ID '" + id + "'");
  }

  var gl = this.gl;

  var src = "";
  var child = node.firstChild;

  while (child) {
    if (child.nodeType == child.TEXT_NODE) {
      src += child.textContent;
    }
    child = child.nextSibling;
  }

  if (node.type == "x-shader/x-fragment") {
    var type = gl.FRAGMENT_SHADER;
  } else if (node.type == "x-shader/x-vertex") {
    var type = gl.VERTEX_SHADER;
  } else {
    throw new Error("Unknown shader type '" + node.type + "'");
  }

  return this._shaderFromString(type, src);
};

Program.prototype._shaderFromString = function (type, str) {
  var gl = this.gl;

  var shader = gl.createShader(type);
  gl.shaderSource(shader, str);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error("Could not compile shader: " + gl.getShaderInfoLog(shader));
  }
  return shader;
};

Program.Points = function (gl) {
  var vs = this._get("shaders/points.vertex.glsl");
  var fs = this._get("shaders/points.fragment.glsl");

  var attributes = ["aPosition", "aColor", "aSize"];
  var uniforms = ["uViewProjection"];

  Program.call(this, gl, {
    vs: vs,
    fs: fs,
    attributes: attributes,
    uniforms: uniforms,
  });
};
Program.Points.prototype = Object.create(Program.prototype);

Program.Points.prototype._get = function (url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url + "?" + Math.random(), false);
  xhr.send();
  return xhr.responseText;
};

Program.ParticleSet = function (gl) {
  var vs = this._get("shaders/particleset.vertex.glsl");
  var fs = this._get("shaders/particleset.fragment.glsl");

  var attributes = ["aVelocity"];
  var uniforms = [
    "uModelView",
    "uProjection",
    "uStartTime",
    "uCurrentTime",
    "uLifetime",
    "uGravity",
    "uColor",
  ];

  Program.call(this, gl, {
    vs: vs,
    fs: fs,
    attributes: attributes,
    uniforms: uniforms,
  });
};
Program.ParticleSet.prototype = Object.create(Program.prototype);

Program.ParticleSet.prototype._get = function (url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url + "?" + Math.random(), false);
  xhr.send();
  return xhr.responseText;
};
