
<!doctype html>
<html lang="en">
<head>
	<title>twojdom.pl - projekt 3D</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<link rel="stylesheet" type="text/css" href="../style/style.css" />
<style>
body{
background:black;
}
</style>
</head>
<body>

<div id="backWindow">
sterowanie => <br/> WSAD<br/>
gora/dol => <br/> R,F<br/>
fullscreen => <br/> M<br/>
	<input type=button name=backButton id=backButton value="<-powrot" onclick="javascript:history.back()">
</div>

<script src="../js-Three.js/Three.js"></script>
<script src="../js-Three.js/Detector.js"></script>
<script src="../js-Three.js/Stats.js"></script>
<script src="../js-Three.js/THREEx.KeyboardState.js"></script>
<script src="../js-Three.js/THREEx.FullScreen.js"></script>
<script src="../js-Three.js/THREEx.WindowResize.js"></script>
<script src="../js-Three.js/DAT.GUI.min.js"></script>

<script src="../js-Three.js/_customShape.js"></script>
<script src="../js-Three.js/_effect.js"></script>
<script src="../js-Three.js/_gui.js"></script>
<script src="../js-Three.js/_loader.js"></script>
<script src="../js-Three.js/_settings.js"></script>

<script>
// MAIN
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
// standard global variables
var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube, skybox;
var roof, wall, windoww, door;
var lamp1, lamp2;
var textureRoof=new Array();
var textureWall=new Array();
var textureWindow=new Array();
var textureDoor=new Array();
var video, videoImage, videoImageContext, videoTexture;
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
init();
animate();
var particleGroup, particleAttributes;
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	SCREEN_WIDTH2=640;
	SCREEN_HEIGHT2=480;

	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,30,400);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
//	renderer.shadowMapEnabled = true;

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	loadTexture();
	
	drawFloor(parameters.floorDensity);
	//drawAxes();

	var id=<?php echo $_GET['Id_Dom'];?>;
	loadHouse(id, 50, 0, 0, 0);
	loadLamp(id, 50, 0, 0, 0);
	loadTv(id, 50, 0, 0, 0);
	loadSurround(id, 50, 0, 0, 0);
	
	loadHouse(id, 50, 700, 0, 0);
	loadSurround(id, 50, 700, 0, 0);
	loadHouse(id, 50, -700, 0, 0);
	loadSurround(id, 50, -700, 0, 0);
	
	//do testow na wiecej obiektow
	for(var i=0;i<10;i++){
	for(var j=0;j<10;j++){
	//loadModel(<?php echo $_GET['Id_Dom'];?>, 5, 100*i, 0, 100*j);
	}
	}
	
	setupSkyBox(5);
	lightAmbient();
	lightPoint();
	lightSpot();
	setupFog(0x9999ff);
	playVideo();
	
	showStats();
	showGui();

	setParticles(300,250,310, 20, '../image/snowflake3.png');
	
	//drzewa i krzaki
	oneParticle(-440,155,200, '../image/tree4.png');
	oneParticle(640,155,400, '../image/tree4.png');
	oneParticle(280,125,200, '../image/tree1.png');
	oneParticle(-300,130,-300, '../image/tree3.png');
oneParticle(200,130,720, '../image/tree3.png');

	oneParticle(-300,40,200, '../image/tree5.png');
	oneParticle(-210,40,350, '../image/tree5.png');
	oneParticle(250,40,400, '../image/tree5.png');
	
	var cubeGeometry = new THREE.CubeGeometry( 0.05, 0.05, 0.05 );
	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x000088 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(-300,50,1000);
	cube.visible=false;
	var rotation_matrix = new THREE.Matrix4().makeRotationY(-0.4);
		cube.matrix.multiplySelf(rotation_matrix);
		cube.rotation.getRotationFromMatrix(cube.matrix);
	scene.add(cube);	
	
	updateEffect();
	
	projector = new THREE.Projector();
	
	// when the mouse moves, call the given function
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{

if(parameters.intersection){
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( scene.children );

	// INTERSECTED = the object in the scene currently closest to the camera 
	//		and intersected by the Ray projected from the mouse position 	
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		// if the closest object intersected is not the currently stored intersection object
		if ( intersects[ 0 ].object != INTERSECTED ) 
		{
		    // restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED ) 
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[ 0 ].object;
			// store color of closest object (for later restoration)
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			// set a new color for closest object
			INTERSECTED.material.color.setHex( 0xffff00 );
			INTERSECTED.material.wireframe=true;
		}
	} 
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ) {
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			INTERSECTED.material.wireframe=false;
			}
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}
}

	var delta = clock.getDelta(); // seconds.
	var moveDistance = 200 * delta; // 200 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
	
		var relativeCameraOffset = new THREE.Vector3(0,0,1);
	var cameraOffset = cube.matrixWorld.multiplyVector3( relativeCameraOffset );
	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt( cube.position );
	
	// WSAD
	if ( keyboard.pressed("W") )
		cube.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		cube.translateZ(  moveDistance );
	if ( keyboard.pressed("A") )
	{
	    var rotation_matrix = new THREE.Matrix4().makeRotationY(rotateAngle);
		cube.matrix.multiplySelf(rotation_matrix);
		cube.rotation.getRotationFromMatrix(cube.matrix);
	}
	if ( keyboard.pressed("D") )
	{
	    var rotation_matrix = new THREE.Matrix4().makeRotationY(-rotateAngle);
		cube.matrix.multiplySelf(rotation_matrix);
		cube.rotation.getRotationFromMatrix(cube.matrix);
	}
	// up/down
	if ( keyboard.pressed("R") )
	    cube.translateY( moveDistance );
	if ( keyboard.pressed("F") )
	    cube.translateY( -moveDistance );
		
	stats.update();
}

function render() 
{
	if(parameters.video){
		if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
		{
			videoImageContext.drawImage( video, 0, 0 );
			if ( videoTexture ) 
				videoTexture.needsUpdate = true;
		}
	}
	renderer.render( scene, camera );
}

function loadTexture(){
for(var i=0;i<9;i++){
var texture=new THREE.ImageUtils.loadTexture( "../image/roof/"+(i+1)+".jpg" );
texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set( 10, 10 );
textureRoof.push(texture);	
}
for(var i=0;i<7;i++){
var texture=new THREE.ImageUtils.loadTexture( "../image/wall/"+(i+1)+".jpg" );
texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set( 10, 10 );
textureWall.push(texture);	
}
for(var i=0;i<13;i++){
var texture=new THREE.ImageUtils.loadTexture( "../image/window/"+(i+1)+".jpg" );
textureWindow.push(texture);	
}
for(var i=0;i<6;i++){
var texture=new THREE.ImageUtils.loadTexture( "../image/door/"+(i+1)+".jpg" );
textureDoor.push(texture);	
}
}
</script>

</body>
</html>
