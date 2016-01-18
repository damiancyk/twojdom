var ambientLight, pointLight, spotLight, axes;
var pointLightBulb, spotLightBulb;

function lightAmbient(){
	ambientLight = new THREE.AmbientLight(0x000000);
	scene.add(ambientLight);
}

function lightPoint(){
	pointLight = new THREE.PointLight(0xffff00);
	pointLight.position.set(300,250,300);
	scene.add(pointLight);
	var pointLightBulb = new THREE.Mesh( 
		new THREE.SphereGeometry( 4, 16, 8 ), 
		new THREE.MeshBasicMaterial( { color: 0xffff00 } )
	);
	scene.add( pointLightBulb );
	pointLightBulb.position = pointLight.position;
}

function lightSpot(){
	var spotLightColor=0x0000ff;
	spotLight = new THREE.SpotLight(spotLightColor);
	spotLight.position.set(-50,60,340);
	scene.add(spotLight);
	spotLight.shadowCameraVisible = true;
	//spotLight.shadowDarkness = 0.70;
	spotLight.intensity = 4;
	scene.add(spotLight);
	var spotLightBulb = new THREE.Mesh( 
		new THREE.SphereGeometry( 1, 16, 8 ), 
		new THREE.MeshBasicMaterial( { color: spotLightColor } )
	);
	scene.add( spotLightBulb );
	spotLightBulb.position = spotLight.position;
}

function setupSkyBox(number){
if(skybox)scene.remove(skybox);
	var materialArray = [];
	var url="../image/skybox/"+number;
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/px.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/nx.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/py.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/ny.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/pz.jpg' ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( url+'/nz.jpg' ) }));
	var skyboxGeom = new THREE.CubeGeometry( 3000, 3000, 3000, 1, 1, 1, materialArray );
	skybox = new THREE.Mesh( skyboxGeom, new THREE.MeshFaceMaterial() );
	skybox.position.y=100;
	skybox.flipSided = true;
	scene.add( skybox );
}

function setupFog(value){
	scene.fog = new THREE.FogExp2( value, 0 );
}

function drawAxes(){
	axes = new THREE.AxisHelper();
	scene.add(axes);
}

function playVideo(){
//////////
	// VIDEO //
	///////////
	
	// create the video element
	video = document.createElement( 'video' );
	// video.id = 'video';
	// video.type = ' video/ogg; codecs="theora, vorbis" ';
	video.src = "../videos/sintel.ogv";
	video.load(); // must call after setting/changing source
	video.play();
	
	// alternative method -- 
	// create DIV in HTML:
	// <video id="myVideo" autoplay style="display:none">
	//		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
	// </video>
	// and set JS variable:
	// video = document.getElementById( 'myVideo' );
	
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 480;
	videoImage.height = 204;

	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true } );
	// the geometry on which the movie will be displayed;
	// 		movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
	movieScreen.doubleSided = true;
	movieScreen.rotation.x = Math.PI / 2;
	movieScreen.rotation.z = Math.PI / 2;
	movieScreen.position.set(250,130,500);
	scene.add(movieScreen);
}

function oneParticle(posx, posy, posz, src){
var particleTexture = THREE.ImageUtils.loadTexture( src );

	var particleGroup = new THREE.Object3D();
	var particleAttributes = { startSize: [], startPosition: [], randomness: [] };
	
	//var radiusRange = 50;

		var sprite = new THREE.Sprite( { map: particleTexture, useScreenCoordinates: false, color: 0xffffff } );
		sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

		// for a cube:
		// sprite.position.multiplyScalar( radiusRange );
		// for a solid sphere:
		// sprite.position.setLength( radiusRange * Math.random() );
		// for a spherical shell:
		//sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
		
		// sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
		//sprite.color.setHSV( 0.4, 0.9, 0.9 ); 
		
		// sprite.opacity = 0.80; // translucent particles
		//sprite.blending = THREE.AdditiveBlending; // "glowing" particles
		
		particleGroup.add( sprite );
		// add variable qualities to arrays, if they need to be accessed later
		particleAttributes.startPosition.push( sprite.position.clone() );
		particleAttributes.randomness.push( Math.random() );

	particleGroup.position.x = posx;
	particleGroup.position.y = posy;
	particleGroup.position.z = posz;
	scene.add( particleGroup );	
}

function setParticles(posx, posy, posz, totalParticles, src){
var particleTexture = THREE.ImageUtils.loadTexture( src );

	var particleGroup = new THREE.Object3D();
	var particleAttributes = { startSize: [], startPosition: [], randomness: [] };
	
	var radiusRange = 100;
	for( var i = 0; i < totalParticles; i++ ) 
	{
		var sprite = new THREE.Sprite( { map: particleTexture, useScreenCoordinates: false, color: 0xffffff } );
		sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
		// for a cube:
		// sprite.position.multiplyScalar( radiusRange );
		// for a solid sphere:
		// sprite.position.setLength( radiusRange * Math.random() );
		// for a spherical shell:
		sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );
		
		 sprite.color.setRGB( Math.random(),  Math.random(),  0 ); 
		//sprite.color.setHSV( 0.4, 0.9, 0.9 ); 
		
		// sprite.opacity = 0.80; // translucent particles
		sprite.blending = THREE.AdditiveBlending; // "glowing" particles
		
		particleGroup.add( sprite );
		// add variable qualities to arrays, if they need to be accessed later
		particleAttributes.startPosition.push( sprite.position.clone() );
		particleAttributes.randomness.push( Math.random() );
	}
	particleGroup.position.x = posx;
	particleGroup.position.y = posy;
	particleGroup.position.z = posz;
	scene.add( particleGroup );	
}

function setMaterial(name){
wall.material='Lambert';
}
