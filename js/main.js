// Generated by CoffeeScript 1.9.1
var Canvas, Cube, Line, formule;

formule = function(obj) {
  var height, width;
  height = obj.height;
  width = obj.width;
  return Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
};

Canvas = (function() {
  function Canvas(width1, height1, element) {
    this.width = width1;
    this.height = height1;
    this.element = element;
    this.initCanvas();
    this.initElements();
    this.render();
  }

  Canvas.prototype.initCanvas = function() {
    this.initScene();
    this.initRenderer();
    return this.initCamera();
  };

  Canvas.prototype.initScene = function() {
    return this.scene = new THREE.Scene();
  };

  Canvas.prototype.initRenderer = function() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff);
    return this.element.append(this.renderer.domElement);
  };

  Canvas.prototype.initCamera = function() {
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    return this.camera.position.z = 500;
  };

  Canvas.prototype.initElements = function() {
    this.cube = new Cube(prompt('Какая шырина куба вам?'), prompt('Какая высота куба вам?'), prompt('Какая глубина куба вам?')).getCube();
    this.scene.add(this.cube);
    this.line = new Line(this.cube.geometry.parameters).getLine();
    return this.scene.add(this.line);
  };

  Canvas.prototype.render = function() {
    if (typeof this.game === 'undefined') {
      this.game = true;
    }
    if (this.game) {
      requestAnimationFrame(this.render.bind(this));
      this.cube.rotation.y += 0.0025;
      this.line.rotation.y += 0.0025;
      return this.renderer.render(this.scene, this.camera);
    } else {
      return alert("game over");
    }
  };

  return Canvas;

})();

Cube = (function() {
  var mesh;

  mesh = null;

  function Cube(a, b, c) {
    var geometry, material;
    if (a == null) {
      a = 200;
    }
    if (b == null) {
      b = 200;
    }
    if (c == null) {
      c = 200;
    }
    geometry = new THREE.BoxGeometry(a, b, c);
    material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true
    });
    mesh = new THREE.Mesh(geometry, material);
  }

  Cube.prototype.getCube = function() {
    return mesh;
  };

  return Cube;

})();

Line = (function() {
  var line;

  line = null;

  function Line(cubeSize) {
    var geometry, material;
    material = new THREE.LineBasicMaterial({
      color: 0xff0000
    });
    console.log(cubeSize);
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(cubeSize.width / 2, cubeSize.height / 2, cubeSize.depth / 2));
    geometry.vertices.push(new THREE.Vector3(-(cubeSize.width / 2), -(cubeSize.height / 2), -(cubeSize.depth / 2)));
    line = new THREE.Line(geometry, material);
    alert("Длинна линии: " + formule(cubeSize));
  }

  Line.prototype.getLine = function() {
    return line;
  };

  return Line;

})();

$(function() {
  window.w = $(window).width();
  window.h = $(window).height();
  window.$canvas = $("#container");
  return window.canvas = new Canvas(w, h, $canvas);
});

//# sourceMappingURL=main.js.map
