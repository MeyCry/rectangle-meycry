formule = (obj) ->
  height = obj.height
  width = obj.width

  Math.sqrt(Math.pow(height,2) + Math.pow(width, 2))


class Canvas
  constructor: (@width, @height, @element) ->
    do @initCanvas
    do @initElements
    do @render


  initCanvas: ->
    do @initScene
    do @initRenderer
    do @initCamera


  initScene: ->
    @scene = new THREE.Scene()


  initRenderer: ->
    # create
    @renderer = new THREE.WebGLRenderer()
    #    @renderer = new THREE.CanvasRenderer()

    # settings
    @renderer.setSize(@width, @height)
    @renderer.setClearColor(0xffffff)

    # append
    @element.append(@renderer.domElement)


  initCamera: ->
    @camera = new THREE.PerspectiveCamera(75, @width / @height, 0.1, 1000)
    @camera.position.z = 500

  initElements: ->
    @cube = new Cube(
      prompt('Какая ширина куба вам?'),
      prompt('Какая высота куба вам?'),
      prompt('Какая глубина куба вам?')
    )
    .getCube()
    @scene.add(@cube)

    @line = new Line(@cube.geometry.parameters).getLine()
    @scene.add(@line)

  render: -> # or animation / animate
    if typeof @game is 'undefined'
      @game = true

    if @game
      requestAnimationFrame(@render.bind @)
      # start animaiton tick

      @cube.rotation.y += 0.0025
      @line.rotation.y += 0.0025

      # end
      @renderer.render(@scene, @camera)
    else
      alert("game over")


class Cube
  mesh = null

  constructor: (a = 200, b = 200, c = 200) ->
    geometry = new THREE.BoxGeometry( a, b, c );
    material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
#    material = new THREE.MeshLambertMaterial
#      color: 0x0000ff
#      transparent: true
#      opacity: .3

    mesh = new THREE.Mesh(geometry, material)

  getCube: -> mesh


class Line
  line = null

  constructor: (cubeSize) ->
    material = new THREE.LineBasicMaterial
      color: 0xff0000

    console.log cubeSize

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(cubeSize.width/2, cubeSize.height/2, cubeSize.depth/2));
    geometry.vertices.push(new THREE.Vector3(-(cubeSize.width/2), -(cubeSize.height/2), -(cubeSize.depth/2)));

    line = new THREE.Line(geometry, material);

    alert("Длинна линии: "+formule(cubeSize))

  getLine: -> line

$ ->
  window.w = $(window).width()
  window.h = $(window).height()
  window.$canvas = $("#container")

  window.canvas = new Canvas(w, h, $canvas);