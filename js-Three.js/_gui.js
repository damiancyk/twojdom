var stats;
var gui = new dat.GUI();
var lookPoint=new THREE.Vector3(0,0,0);

function setTimeDay(){
var day = parameters.poraDnia;
scene.remove(ambientLight);
scene.remove(pointLight);
if(day=="dzien"){
	setupSkyBox(6);
	ambientLight = new THREE.AmbientLight(0xDDDDDD);
	pointLight = new THREE.PointLight(0x000000);
	pointLight.position.set(300,250,300);
	spotLight.intensity = 0;
}else if(day=="noc"){
	setupSkyBox(5);
	ambientLight = new THREE.AmbientLight(0x000000);
	pointLight = new THREE.PointLight(0xffff00);
	pointLight.position.set(300,250,300);
	spotLight.intensity = 20;
}
scene.add(pointLight);
scene.add(ambientLight);
}

function updateRoof(){
var value = parameters.materialRoof;
	var newMaterial;
	if (value == "Podstawowy")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[0] } );
	else if (value == "1")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[1]} );
	else if (value == "2")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[2]} );
	else if (value == "3")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[3]} );
	else if (value == "4")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[4]} );
	else if (value == "5")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[5]} );
	else if (value == "6")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[6]} );
	else if (value == "7")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[7]} );
	else if (value == "8")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureRoof[8]} );
	else if (value == "Brak")
		newMaterial = new THREE.MeshLambertMaterial( { color: 0x3366FF } );
	else if (value == "Siatka")
		newMaterial = new THREE.MeshLambertMaterial( { wireframe: true } );
		roof.material = newMaterial;
}

function updateWall(){
		var value = parameters.materialWall;
	var newMaterial;
	if (value == "Podstawowy")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[0] } );
	else if (value == "1")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[1]} );
	else if (value == "2")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[2]} );
		else if (value == "3")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[3]} );
		else if (value == "4")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[4]} );
		else if (value == "5")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[5]} );
		else if (value == "6")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWall[6]} );
	else if (value == "Brak")
		newMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
	else if (value == "Siatka")
		newMaterial = new THREE.MeshLambertMaterial( { wireframe: true } );
		wall.material = newMaterial;
}

function updateDoor(){
	var value = parameters.materialDoor;
	var newMaterial;
	if (value == "Podstawowy")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[0] } );
	else if (value == "1")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[1]} );
	else if (value == "2")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[2]} );
	else if (value == "3")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[3]} );
	else if (value == "4")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[4]} );
	else if (value == "5")
	newMaterial = new THREE.MeshLambertMaterial( { map: textureDoor[5]} );
	else if (value == "Brak")
	newMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
	else if (value == "Siatka")
	newMaterial = new THREE.MeshLambertMaterial( { wireframe: true } );
	door.material = newMaterial;
}

function updateWindow(){
		var value = parameters.materialWindow;
	var newMaterial;
	if (value == "Podstawowy")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[0] } );
	else if (value == "1")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[1]} );
	else if (value == "2")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[2]} );
		else if (value == "3")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[3]} );
		else if (value == "4")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[4]} );
		else if (value == "5")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[5]} );
		else if (value == "6")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[6]} );
		else if (value == "7")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[7]} );
		else if (value == "8")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[8]} );
		else if (value == "9")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[9]} );
		else if (value == "10")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[10]} );
		else if (value == "11")
		newMaterial = new THREE.MeshLambertMaterial( { map: textureWindow[11]} );
	else if (value == "Brak")
		newMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
	else if (value == "Siatka")
		newMaterial = new THREE.MeshLambertMaterial( { wireframe: true } );
		windoww.material = newMaterial;
}

function updateEffect(){
if(parameters.axes)scene.add(axes);
else scene.remove(axes);
if(parameters.ambientLight)scene.add(ambientLight);
else scene.remove(ambientLight);
if(parameters.pointLight)scene.add(pointLight);
else scene.remove(pointLight);
if(parameters.spotLight)scene.add(spotLight);
else scene.remove(spotLight);
scene.fog = new THREE.FogExp2( 0x9999ff, parameters.opacityFog );
}

function showStats(){
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '4px';
	stats.domElement.style.left = '4px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
		var spriteTexture = THREE.ImageUtils.loadTexture( '../image/wall/2.jpg' );
	sprite = new THREE.Sprite( { map: spriteTexture, alignment: THREE.SpriteAlignment.topLeft } );
	sprite.scale.set(0.7,1.4,0.7);
				sprite.position.set( 0, 0, 2 );
				sprite.opacity = 0.7;
				scene.add( sprite );
}
		
function showGui(){
var folderPodstawowe = gui.addFolder('Podstawowe');
var pora = folderPodstawowe.add( parameters, 'poraDnia', [ "dzien", "noc"] ).name('Pora dnia').listen();
	pora.onChange(function(value) 
	{   setTimeDay();  });
	
			var fogOpacity = folderPodstawowe.add( parameters, 'opacityFog' ).min(0).max(0.002).step(0.0001).name('Mgla').listen();
		fogOpacity.onChange(function(value)
	{   
	scene.fog = new THREE.FogExp2( 0x9999ff, value );
	});
	//folderPodstawowe.open();
	
	var folderEfekty = gui.addFolder('Efekty');
	var cubeOpacity = folderEfekty.add( parameters, 'opacity' ).min(0).max(1).step(0.01).name('Przezroczystosc').listen();
		cubeOpacity.onChange(function(value)
	{   
	roof.material.opacity = value;   
	wall.material.opacity = value;   
	});
	
		var cubeVisible = folderEfekty.add( parameters, 'visibleSkyBox' ).name('SkyBox').listen();
	cubeVisible.onChange(function(value) 
	{   
		skybox.visible = value;  	
	});
	
			var intersectionSet = folderEfekty.add( parameters, 'intersection' ).name('Raycasting').listen();
	intersectionSet.onChange(function(value) 
	{   
		parameters.intersection=value;  	
	});
				var ambientVisible = folderEfekty.add( parameters, 'ambientLight' ).name('Swiatlo rozpr').listen();
	ambientVisible.onChange(function(value) 
	{   
		if(value)scene.add(ambientLight);
		else scene.remove(ambientLight);  	
	});
			var pointVisible = folderEfekty.add( parameters, 'pointLight' ).name('Swiatlo punktowe').listen();
	pointVisible.onChange(function(value) 
	{   
		if(value)scene.add(pointLight);
		else scene.remove(pointLight);  	
	});
	
				var spotVisible = folderEfekty.add( parameters, 'spotLight' ).name('Swiatlo kier').listen();
	spotVisible.onChange(function(value) 
	{   
		if(value)scene.add(spotLight);
		else scene.remove(spotLight);
	});
	//folderEfekty.open();
	
	var folderMaterialy = gui.addFolder('Materialy');
	var roofMaterial = folderMaterialy.add( parameters, 'materialRoof', [ "1","2","3","4","5","6","7","8","9","Siatka", "Brak", "Podstawowy"] ).name('Dach').listen();
	roofMaterial.onChange(function(value) 
	{   updateRoof();   });
	var wallMaterial = folderMaterialy.add( parameters, 'materialWall', [ "1","2","3","4","5","6","7","Siatka", "Brak", "Podstawowy"] ).name('Sciany').listen();
	wallMaterial.onChange(function(value) 
	{   updateWall();   });
	var doorMaterial = folderMaterialy.add( parameters, 'materialDoor', [ "1","2","3","4","5","6","Siatka", "Brak", "Podstawowy"] ).name('Drzwi').listen();
	doorMaterial.onChange(function(value) 
	{   updateDoor();   });
	var windowMaterial = folderMaterialy.add( parameters, 'materialWindow', [ "1","2","3","4","5","6","7","8","9","10","11","12","Siatka", "Brak", "Podstawowy"] ).name('Okna').listen();
	windowMaterial.onChange(function(value) 
	{   updateWindow();   });
	//folderMaterialy.open();
	
	var folderPozycja = gui.addFolder('Pozycja');
	var cubeX = folderPozycja.add( parameters, 'x' ).min(-200).max(200).step(1).listen();
	var cubeY = folderPozycja.add( parameters, 'y' ).min(0).max(100).step(1).listen();
	var cubeZ = folderPozycja.add( parameters, 'z' ).min(-200).max(200).step(1).listen();
		cubeX.onChange(function(value) 
	{   
	roof.position.x = value;
	wall.position.x = value;  	
	door.position.x = value;
	windoww.position.x = value;
	});
	cubeY.onChange(function(value) 
	{   
	roof.position.y = value;   
	wall.position.y = value; 
	door.position.y = value; 
	windoww.position.y = value; 
	});
	cubeZ.onChange(function(value) 
	{   
	roof.position.z=value;
	wall.position.z=value;
	door.position.z=value;
	windoww.position.z=value;
	});
						var axesVisible = folderPozycja.add( parameters, 'axes' ).name('Strz pomocnicze').listen();
	axesVisible.onChange(function(value) 
	{   
		if(value)scene.add(axes);
		else scene.remove(axes);  	
	});
	//folderPozycja.open();
}

function resetScene()
{
	parameters.x = 0;
	parameters.y = 30;
	parameters.z = 0;
	parameters.color = "#ff0000";
	parameters.opacity = 1;
	parameters.visible = true;
	parameters.material = "Lambert";
	updateScene();
}

			