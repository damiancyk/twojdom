		function loadHouse(id, scale, x, y, z){
			var loader = new THREE.JSONLoader();
			
			var callbackRoof = function( geometry) {
			var texture = THREE.ImageUtils.loadTexture( "../image/roof/3.jpg" );
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
			texture.repeat.set( 10, 10 );
			var material = new THREE.MeshLambertMaterial({map: texture});
			roof = new THREE.Mesh( geometry, material );
		//	roof.doubleSided = true;
			//roof.castShadow = true;
          //     roof.receiveShadow = true;
			roof.position.set(x,y,z);
			roof.scale.set(scale,scale,scale);
			scene.add( roof );
			};
			loader.load( "../model/"+id+"/roof.js", callbackRoof);
			
			var callbackWall = function( geometry) {
			var texture = THREE.ImageUtils.loadTexture( "../image/wall/7.jpg" );
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
			texture.repeat.set( 10, 10 );
			var material = new THREE.MeshLambertMaterial( { map:texture } ); 
			wall = new THREE.Mesh( geometry, material );
			//wall.doubleSided = true;
			//wall.castShadow = true;
			wall.position.set(x,y,z);
			wall.scale.set(scale,scale,scale);
			scene.add( wall );
			};
			loader.load( '../model/'+id+'/wall.js', callbackWall);
			
			var callbackWindow = function( geometry) {
			var texture = THREE.ImageUtils.loadTexture( "../image/window/1.jpg" );
			var material = new THREE.MeshLambertMaterial( { map:texture } ); 
			windoww = new THREE.Mesh( geometry, material );
			//windoww.doubleSided = true;
			//windoww.castShadow = true;
			windoww.position.set(x,y,z);
			windoww.scale.set(scale,scale,scale);
			scene.add( windoww );
			};
			loader.load( '../model/'+id+'/window.js', callbackWindow);
			
			var callbackDoor = function( geometry) {
			var texture = THREE.ImageUtils.loadTexture( "../image/door/1.jpg" );
			var material = new THREE.MeshLambertMaterial( { map:texture } ); 
			door = new THREE.Mesh( geometry, material );
			//door.doubleSided = true;
			//door.castShadow = true;
			door.position.set(x,y,z);
			door.scale.set(scale,scale,scale);
			scene.add( door );
			};
			loader.load( '../model/'+id+'/door.js', callbackDoor);
			
			var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffffcc } );
	var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xbbbbbb, wireframe: true, transparent: true } ); 
	var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
			var callback = function( geometry) {
			var texture = THREE.ImageUtils.loadTexture( "../image/wall/1.jpg" );
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
			texture.repeat.set( 100, 100 );
			var material = new THREE.MeshLambertMaterial( { map:texture} ); 
			door = new THREE.Mesh( geometry, material );
			//door.doubleSided = true;
			door.position.set(x,y,z);
			door.scale.set(scale,scale,scale);
			scene.add( door );
			};
			loader.load( '../model/'+id+'/inside.js', callback);
		}
		
		function loadLamp(id, scale, x, y, z){
		var loader = new THREE.JSONLoader();
		var callbackLamp1 = function( geometry) {
			var material = new THREE.MeshLambertMaterial( { color: 0x333333 } ); 
			lamp1 = new THREE.Mesh( geometry, material );
			lamp1.position.set(x-50,y,z+340);
			lamp1.scale.set(scale/4,scale/4,scale/4);
			scene.add( lamp1 );
			};
			loader.load( '../model/surround/1/lamp.js', callbackLamp1);
			
			var callbackLamp2 = function( geometry) {
			var material = new THREE.MeshLambertMaterial( { color: 0x333333 } ); 
			lamp2 = new THREE.Mesh( geometry, material );
			lamp2.position.set(x+300,y,z+300);
			lamp2.scale.set(scale,scale,scale);
			scene.add( lamp2 );
			};
			loader.load( '../model/surround/1/lamp.js', callbackLamp2);
			}
			
			function loadTv(id, scale, x, y, z){
			var loader = new THREE.JSONLoader();
			var callbackTv = function( geometry) {
			var material = new THREE.MeshBasicMaterial( { color: 0x000000 } ); 
			var tv = new THREE.Mesh( geometry, material );
			tv.doubleSided = true;
			tv.position.set(x+250,y-20,z+500);
			tv.scale.set(scale,scale,scale);
			scene.add( tv );
			};
			loader.load( '../model/surround/1/tv.js', callbackTv);
			}
		
		function loadSurround(id, scale, x, y, z) {
			var darkMaterial = new THREE.MeshBasicMaterial( { color: 0x666666 } );
			
			var texture = THREE.ImageUtils.loadTexture( "../image/wall/1.jpg" );
			var material = new THREE.MeshLambertMaterial( { map:texture } ); 
			var roadMaterial= new THREE.MeshBasicMaterial( { map:texture, wireframe: true, transparent: true } ); 
			var multiRoadMaterial = [ darkMaterial, roadMaterial ];
			
			
			var wireframeMaterial = new THREE.MeshBasicMaterial( { map:texture, wireframe: true, transparent: true } ); 
			var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
				
	var tex = new THREE.ImageUtils.loadTexture( '../image/wall/7.jpg' );
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
	tex.repeat.set( 10, 1 );
	var material = new THREE.MeshLambertMaterial( { map: tex } );
	var geometry = new THREE.CubeGeometry(2, 50, 1450, 1, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(350+x,20+y,z);
	scene.add(mesh);
			
	var tex = new THREE.ImageUtils.loadTexture( '../image/wall/7.jpg' );
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
	tex.repeat.set( 10, 1 );
	var material = new THREE.MeshLambertMaterial( { map: tex } );
	var geometry = new THREE.CubeGeometry(700, 50, 2, 1, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x,20+y,-720+z);
	scene.add(mesh);
	
	var tex = new THREE.ImageUtils.loadTexture( '../image/grass/1.jpg' );
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
	tex.repeat.set( 10, 2 );
	var material = new THREE.MeshLambertMaterial( { map: tex } );
	var geometry = new THREE.PlaneGeometry(100, 500, 10, 10);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x,1+y,z+500);
	scene.add(mesh);
	
		var tex = new THREE.ImageUtils.loadTexture( '../image/grass/2.jpg' );
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping; 
	tex.repeat.set( 10, 1 );
	var material = new THREE.MeshLambertMaterial( { map: tex } );
	var geometry = new THREE.PlaneGeometry(750, 100, 10, 10);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x,1.5+y,z+800);
	scene.add(mesh);
		}