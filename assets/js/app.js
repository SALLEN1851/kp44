
$(window).on('load', function() {




	var windowX = $(window).width(),
		contentHeight = $('.swiper-slide').height(),
		xMouse = 0, 
		yMouse = 0,
		$body = $('body'),
		activeSlideID = 0,
		scrollLocal = 0;


	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	SceanControlOnOff Pannal
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	
	var Scean01OnOff = 1,
		Scean02OnOff = 1,
		Scean03OnOff = 1,
		Scean04OnOff = 1,
		Scean05OnOff = 1,
		Scean06OnOff = 1,
		Scean06OnOff = 1,
		Scean07OnOff = 1;

	Scean01();
	Scean02();
	Scean03();
	Scean04();
	Scean05();
	Scean06();
	Scean07();



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	StartShow
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	setTimeout(function(){
		Scean02OnOff = 0;
		Scean03OnOff = 0;
		Scean04OnOff = 0;
		Scean05OnOff = 0;
		Scean06OnOff = 0;
		Scean06OnOff = 0;
		Scean07OnOff = 0;
	}, 500);

	setTimeout(function(){
		$body.addClass('Running');
		scrollingToggle();
	}, 2000);


	var $ClickSlide = $('.swiper-slide'),
		$BlackOut = $('#BlackOut');


	window.sittingAt = 0;

	$ClickSlide.on('click', function(){
		

		if(scrollLocal > contentHeight-30){
			
			if(!smallScreen){
				$BlackOut.css({
					'left' : ''+xMouse+'px',
					'top' : ''+yMouse+'px'
				});
			}

			$BlackOut.addClass('openOut');

			// setTimeout(function(){
			// 	$BlackOut.addClass('openOut');
			// }, 500);

			var linkTo = $(this).attr('deta_link');
			setTimeout(function(){
				window.location.href = baseLink+linkTo
			}, 1500);
		}

	});




    //-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Home BG
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

    function Scean01(){

		var renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById("canvas"),
			antialias: true
		});

		//-- BG and Reflections
		var scene = new THREE.Scene();
			scene.background = new THREE.CubeTextureLoader()
				.setPath( 'assets/img/' )
				.load( [ 'bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png', 'bg.png' ] );

		var scene2 = new THREE.Scene();
			scene2.background = new THREE.CubeTextureLoader()
				.setPath( 'assets/img/' )
				.load( [ 'bg2.jpg', 'bg2.jpg', 'bg2.jpg', 'bg2.jpg', 'bg2.jpg', 'bg2.jpg' ] );

		var r = "assets/img/";
		var urls = [
			r + "bg2.jpg", r + "bg2.jpg",
			r + "bg2.jpg", r + "bg2.jpg",
			r + "bg2.jpg", r + "bg2.jpg"
		];
		var textureCube = new THREE.CubeTextureLoader().load( urls );
		textureCube.mapping = THREE.CubeRefractionMapping;
		var scene3 = new THREE.Scene();
		scene3.background = textureCube;



		//-- Light
		var ambient = new THREE.AmbientLight(16777215, .15);
			scene.add(ambient);

		var light = new THREE.PointLight(0xffffff,1,80);
			light.position.set(0,0,1.5);
			scene.add(light);
		
		var light2 = new THREE.PointLight(0xffffff,5,80);
			light2.position.set(0,3,0);
			scene.add(light2);



		//-- Objects Stage
		var camera = new THREE.PerspectiveCamera(45,windowX/contentHeight,0.1,1000);
		camera.position.set( 0, 0, 4.5 );

		renderer.setSize(windowX, contentHeight);

		var geo = new THREE.SphereGeometry(1, 80, 80);
		var material = new THREE.MeshPhongMaterial( { 
			color: 0x828282, 
			envMap: scene3.background,
			refractionRatio: 0.98, 
			reflectivity: 1,
			shininess: 1000,
		});

		var mesh = new THREE.Mesh(geo, material);
		scene.add(mesh);


		//-- Animations Style
		var deadZone = 0.02,
			speed = 0.006,
			velocity = 9;

		var update = function() {
			for (var i=0; i<mesh.geometry.vertices.length; i++) {
				var v = mesh.geometry.vertices[i];
				v.normalize().multiplyScalar(deadZone*noise.simplex3(v.x*velocity+Date.now()*speed, v.y*velocity, v.z*velocity)+1);
			}
			mesh.geometry.computeVertexNormals();
			mesh.geometry.normalsNeedUpdate = true;
			mesh.geometry.verticesNeedUpdate = true;
		};

		var mouseX = 0, mouseY = 0;
		var windowHalfX = windowX / 2;
		var windowHalfY = contentHeight / 2;

		window.onresize = function() {
			camera.aspect = windowX / contentHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(windowX, contentHeight);
		};

		window.addEventListener( 'resize', onresize, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );



		//-- Cam Control
		function onDocumentMouseMove( event ) {
			mouseX = ( event.clientX - windowHalfX ) * 0.0006;
			mouseY = ( event.clientY - windowHalfY ) * 0.0006;
			if(mouseX > 0){
				mouseX = -Math.abs(mouseX);
			}else{
				mouseX = Math.abs(mouseX);
			}
		}

		function render() {


			if(Scean01OnOff){
			
				update();

				deadZone = mouseX;
				
				if(deadZone < 0 && !isMobile){
					deadZone = Math.abs(deadZone);
				}

				if(isMobile){
					deadZone = 0.02;
				}

				camera.position.set( mouseX, mouseY, 4.5 );
				renderer.render(scene, camera);
			}
			requestAnimationFrame(render);

		}


		render();

	}

	



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 02
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	if(smallScreen){
		$('.SP_Kill').remove();
	}

	var howManyCD = $('.CDCage .holder').length;
	
	function Scean02(){

		var who = 0,
			interSpeed = 300,
			windowX1 = windowX*0.3,
			windowX3 = windowX*0.6,
			$project02 = $('#project02'),
			$CDs = $('#project02 .row .holder'),
			mouseLocaly = yMouse;

		if(smallScreen){
			mouseLocaly = contentHeight*1.5;
		}

		function jumper(){
			
			setTimeout(function() {

				if(xMouse < windowX1){
					Runner03();
				}else if(xMouse > windowX3){
					Runner02();
				}else{
					Runner01();
				}
				
				if(Scean02OnOff){
					var speed = getRandomInt(3);
					// interSpeed = getRandomInt(4)*((mouseLocaly-contentHeight)*0.15);
					$('.holder:eq('+who+')').addClass('Popping0'+speed+'');
					resetOrigin($('.holder:eq('+who+')'), speed);
				}

				jumper();

			}, interSpeed);

		}

		function resetOrigin($targert, classType){
			setTimeout(function() {
				$targert.removeClass('Popping0'+classType+'');
			}, 1000);
		}

		function Runner01(){
			who = makeUniqueRandom();
		}

		function Runner02(){
			who += 1;
			if(who > howManyCD){
				who = 0;
			}
		}
		function Runner03(){
			who -= 1;
			if(who< 0){
				who = howManyCD;
			}
		}

		jumper();

	}

	



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 03
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	function Scean03(){
		var $imgHolder = $('.imgHolder');

		$imgHolder.toggleClass('roller');
		setInterval(function(){
			if(Scean03OnOff){
				$imgHolder.toggleClass('roller')
			}
		}, 5000);
	
	}

	



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 04
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	function Scean04(){
		var	$img = $('#project04 .glitchme'),
			$imgGlitched = $('#project04 .glitched');

		var mainX = $img.width(),
			mainY = $img.height(),
			glitches = document.querySelectorAll('.glitched');

			$imgGlitched.width(mainX).height(mainY);

		setInterval(function(){

			if(Scean04OnOff){
				for(var i = 0; i < glitches.length; i++){
					glitches[i].classList.toggle('glitch-pause');
				}
			}
		}, 1000);


		var ParaScene = $('.holderDancer').get(0);
		var parallaxInstance = new Parallax(ParaScene, {
				relativeInput: true
			});

	}

	



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 05
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	function Scean05(){

		var stage = new PIXI.Container();
		var renderer = PIXI.autoDetectRenderer(windowX, contentHeight, { transparent: true });
		$('#project05').append(renderer.view);
		
		var container = new PIXI.Container();
		stage.addChild(container);

		var originalVertices = [],
		mesh;

		var texture = new PIXI.Texture.fromImage('assets/img/Flag.png');

		texture.on('update',function(){

			mesh = new PIXI.mesh.Plane( this, 20, 20 );
			mesh.width = windowX; //renderer.width * 0.35;
			mesh.height = contentHeight*1.1;//renderer.width * 0.5;
			container.addChild(mesh);//, 0);

			originalVertices = mesh.vertices.slice(0);

			animate();
		});


		var count = 0,
			speed = 25;
		function animate() {

			if(Scean05OnOff){
				count -= speed;

				if ( mesh && mesh.vertices ) { 

					for (let i = 0; i < mesh.vertices.length; i++) {
						mesh.vertices[i] = originalVertices[i] + (11 * Math.cos(count + i * 0.15));
					}
				}

				renderer.render(stage);
			}

			requestAnimationFrame(animate);
		}

	}

	



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 06
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	function Scean06(){

		// Heightfield parameters
		var terrainWidthExtents = windowX/10;
		var terrainDepthExtents = contentHeight/10;
		var terrainWidth = 128;
		var terrainDepth = 128;
		var terrainHalfWidth = terrainWidth / 2;
		var terrainHalfDepth = terrainDepth / 2;
		var terrainMaxHeight = 5;
		var terrainMinHeight = -2;


		// Graphics variables
		var container;
		var camera6, scene, renderer;
		var terrainMesh;
		var clock = new THREE.Clock();


		// Physics variables
		var collisionConfiguration;
		var dispatcher;
		var broadphase;
		var solver;
		var physicsWorld;
		var dynamicObjects = [];
		var transformAux1 = new Ammo.btTransform();
		var heightData = null;
		var ammoHeightData = null;
		var time = 0;
		var objectTimePeriod = 0.3;
		var timeNextSpawn = time + objectTimePeriod;
		var maxNumObjects = 100;

		if(smallScreen){
			maxNumObjects = 40;
			time = 1;
			timeNextSpawn = time + objectTimePeriod;
		}


		init();
		animate();



		function init() {
			heightData = generateHeight( terrainWidth, terrainDepth, -1, 5 );
			initGraphics();
			initPhysics();
		}


		function initGraphics() {
			container = document.getElementById( 'container' );

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( windowX, contentHeight );
			renderer.shadowMap.enabled = true;
			container.appendChild( renderer.domElement );

			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 2000 );
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x1c1c1c );
			camera.position.y = heightData[ terrainHalfWidth + terrainHalfDepth * terrainWidth ] * ( terrainMaxHeight - terrainMinHeight ) + 5;
			camera.position.z = terrainDepthExtents / 1.5;
			camera.lookAt( -20, 0, 0 );

			var geometry = new THREE.PlaneBufferGeometry( terrainWidthExtents, terrainDepthExtents, terrainWidth - 1, terrainDepth - 1 );
			geometry.rotateX( - Math.PI / 2 );


			var vertices = geometry.attributes.position.array;
			for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
				// j + 1 because it is the y component that we modify
				vertices[ j + 1 ] = heightData[ i ];

			}

			geometry.computeVertexNormals();

		}

		function initPhysics() {
			// Physics configuration
			collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
			dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
			broadphase = new Ammo.btDbvtBroadphase();
			solver = new Ammo.btSequentialImpulseConstraintSolver();
			physicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
			physicsWorld.setGravity( new Ammo.btVector3( 0, -15, 0 ) );
			// GRAVATY
			// Create the terrain body
			var groundShape = createTerrainShape();
			var groundTransform = new Ammo.btTransform();
			groundTransform.setIdentity();
			// Shifts the terrain, since bullet re-centers it on its bounding box.
			groundTransform.setOrigin( new Ammo.btVector3( 0, ( terrainMaxHeight + terrainMinHeight ) / 2, 0 ) );
			var groundMass = 0;
			var groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
			var groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
			var groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
			physicsWorld.addRigidBody( groundBody );
		}

		function generateHeight( width, depth, minHeight, maxHeight ) {
			// Generates the height data (a sinus wave)
			var size = width * depth;
			var data = new Float32Array( size );
			var hRange = maxHeight - minHeight;
			var w2 = width / 2;
			var d2 = depth / 2;
			var phaseMult = -13;
			var p = 0;
			for ( var j = 0; j < depth; j ++ ) {
				for ( var i = 0; i < width; i ++ ) {
					var radius = Math.sqrt(
						Math.pow( ( i - w2 ) / w2, 2.0 ) +
							Math.pow( ( j - d2 ) / d2, 2.0 ) );
					// var height = ( Math.sin( radius * phaseMult ) + 1 ) * 0.5 * hRange + minHeight;

					var height = ( Math.sin( radius * phaseMult ) + 1 ) * 0.5 * hRange + minHeight;
					data[ p ] = height;
					p ++;
				}
			}
			return data;
		}

		function createTerrainShape() {

			// This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
			var heightScale = 1;
			// Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
			var upAxis = 1;
			// hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
			var hdt = "PHY_FLOAT";
			// Set this to your needs (inverts the triangles)
			var flipQuadEdges = false;
			// Creates height data buffer in Ammo heap
			ammoHeightData = Ammo._malloc( 4 * terrainWidth * terrainDepth );
			// Copy the javascript height data array to the Ammo one.


			var p = 0;
			var p2 = 0;
			for ( var j = 0; j < terrainDepth; j ++ ) {
				for ( var i = 0; i < terrainWidth; i ++ ) {
					// write 32-bit float data to memory
					Ammo.HEAPF32[ ammoHeightData + p2 >> 2 ] = heightData[ p ];
					p ++;
					// 4 bytes/float
					p2 += 4;

				}
			}


			// Creates the heightfield physics shape
			var heightFieldShape = new Ammo.btHeightfieldTerrainShape(
				terrainWidth,
				terrainDepth,
				ammoHeightData,
				heightScale,
				terrainMinHeight,
				terrainMaxHeight,
				upAxis,
				hdt,
				flipQuadEdges
			);
			// Set horizontal scale
			var scaleX = terrainWidthExtents / ( terrainWidth - 1 );
			var scaleZ = terrainDepthExtents / ( terrainDepth - 1 );
			heightFieldShape.setLocalScaling( new Ammo.btVector3( scaleX, 1, scaleZ ) );
			heightFieldShape.setMargin( 0.05 );
			return heightFieldShape;
		}



		function generateObject() {
			var shape = null;
			var objectSize = 3;
			var margin = 0.05;
			var sx = 4.5;
			var sy = 7;
			var sz = 0.1;


			var MFK = [
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardFiller.jpg" )}),
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardFiller.jpg" )}),
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardFiller.jpg" )}),
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardFiller.jpg" )}),
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardF.jpg" )}),
				new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "assets/img/namecardB.jpg" )})
			]

			var threeObject = new THREE.Mesh( new THREE.BoxBufferGeometry( sx, sy, sz, 1, 1, 1 ), MFK );
			shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
			shape.setMargin( margin );
			threeObject.position.set( ( Math.random() - 0.5 ) * terrainWidth * 0.6, terrainMaxHeight + (objectSize*9), ( Math.random() - 0.5 ) * terrainDepth * 0.6 );
			// BOUNCE POWER
			var mass = objectSize * 20;
			var localInertia = new Ammo.btVector3( 0, 0, 0 );
			shape.calculateLocalInertia( mass, localInertia );
			var transform = new Ammo.btTransform();
			transform.setIdentity();
			var pos = threeObject.position;
			transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
			var motionState = new Ammo.btDefaultMotionState( transform );
			var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia );
			var body = new Ammo.btRigidBody( rbInfo );
			threeObject.userData.physicsBody = body;
			threeObject.receiveShadow = false;
			threeObject.castShadow = false;
			scene.add( threeObject );
			dynamicObjects.push( threeObject );
			physicsWorld.addRigidBody( body );

		}


		function animate() {
			requestAnimationFrame( animate );
			render();
		}

		function render() {

			if(Scean06OnOff){
				var deltaTime = clock.getDelta();
				if ( dynamicObjects.length < maxNumObjects && time > timeNextSpawn ) {
					generateObject();
					timeNextSpawn = time + objectTimePeriod;
				}
				updatePhysics( deltaTime );
				renderer.render( scene, camera );
				time += deltaTime;
			}
		}

		function updatePhysics( deltaTime ) {
			physicsWorld.stepSimulation( deltaTime, 10 );
			// Update objects
			for ( var i = 0, il = dynamicObjects.length; i < il; i ++ ) {
				var objThree = dynamicObjects[ i ];
				var objPhys = objThree.userData.physicsBody;
				var ms = objPhys.getMotionState();
				if ( ms ) {
					ms.getWorldTransform( transformAux1 );
					var p = transformAux1.getOrigin();
					var q = transformAux1.getRotation();
					objThree.position.set( p.x(), p.y(), p.z() );
					objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
				}
			}
		}
	
	}

	


	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scean 07
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	function Scean07(){
		var controls7;
		var mouse = new THREE.Vector2(),
			target = new THREE.Vector2(),
			windowHalf = new THREE.Vector2( windowX / 2, contentHeight / 2 );

		//scene
		var scene7 = new THREE.Scene();

		//mesh
		var geometry7 = new THREE.SphereGeometry( 100, 32, 32 );
			geometry7.scale( - 1, 1, 1 );

		// var material7 = new THREE.MeshBasicMaterial( {
		// 		map: THREE.ImageUtils.loadTexture( 'assets/img/SphericalMap.jpg' )
		// 	} );

		// instantiate a loader
		var loader7 = new THREE.TextureLoader().load('assets/img/SphericalMap.jpg');
		var material7 = new THREE.MeshBasicMaterial( { map: loader7 } );

		var	sphere7 = new THREE.Mesh( geometry7, material7 );
			sphere7.rotation.y = 150.5;
			sphere7.rotation.x = 30;
			scene7.add( sphere7 );

		//camera
		var camera7 = new THREE.PerspectiveCamera(75, windowX / contentHeight, 1, 1000);
			camera7.position.set(0,0,0.1);
			camera7.lookAt(sphere7.position);
			controls7 = new THREE.DeviceOrientationControls( camera7 );

		//render
		var renderer7 = new THREE.WebGLRenderer({
			canvas: document.getElementById("canvas07"),
			antialias: true
		});
		renderer7.setSize(windowX,contentHeight);
		renderer7.render(scene7,camera7);

		
		function render(){

			if(Scean07OnOff){
				target.x = ( 1 - mouse.x ) * 0.002;
	  			target.y = ( 1 - mouse.y ) * 0.002;
	  			if(isMobile){
	  				controls7.update();
	  			}else{
	  				camera7.rotation.x += 0.07 * ( target.y - camera7.rotation.x );
	  				camera7.rotation.y += 0.07 * ( target.x - camera7.rotation.y );
	  			}
				renderer7.render(scene7,camera7);
			}
			requestAnimationFrame(render);
		}

		render();

		document.addEventListener( 'mousemove', onMouseMove, false );

		function onMouseMove( event ) {

			mouse.x = ( event.clientX - windowHalf.x );
			mouse.y = ( event.clientY - windowHalf.x );

		}

	}





	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Mouse Tracking Functions
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	if(!smallScreen){
		
		$( document ).on( "mousemove", function( event ) {
			xMouse =  event.pageX;
			yMouse =  event.pageY;
		});

	}else{

		xMouse = (windowX/2) -30;
		yMouse = (contentHeight/2) -30;
		
	}





	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}


	var uniqueRandoms = []

	function makeUniqueRandom() {
    	//refill the array if needed
		if (!uniqueRandoms.length) {
			for (var i = 0; i < howManyCD; i++) {
				uniqueRandoms.push(i);
			}
		}

		var index = Math.floor(Math.random() * uniqueRandoms.length);
		var val = uniqueRandoms[index];

		// now remove that value from the array
		uniqueRandoms.splice(index, 1);

		return val;

	}






	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Title Fun
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	var $MainTitle = $('#KVTitle'),
		OldAt = -1, 
		whereAt,
		onOrOff = 0;

	var $bodyTitle = $('#SubPageTitle .holderTitle'),
		$TitleRow1 = $('#SubPageTitle .row.first'),
		$TitleRow2 = $('#SubPageTitle .row.secend'),
		$TitleType = $('#SubPageTitle .ProjectType span');

	var $afterScrollTitle = $('#SubPageTitle'),
		$mouseTool = $('.mouse, .mouseHolder');

	function AddTtitleInput($who ,text){
		BuildList();

		var html = '';

		if(text){

			for (var i = 0; i < text.length; i++) { 
				var current = text.charAt(i);

				html += '<span class="appear'+makeUniqueRandom2()+'">'+current+'</span>';
			}

			$who.find('span').remove();
			$who.append(html);

		}else{

			$who.find('span').remove();
		
		}

	}

	// Random Speed Builder
	function BuildList(){

		for (var i = 0; i < 11; i++) {
			uniqueRandoms.push(i);
		}

	}

	function makeUniqueRandom2() {

		var index = Math.floor(Math.random() * uniqueRandoms.length);
		var val = uniqueRandoms[index];

		// now remove that value from the array
		uniqueRandoms.splice(index, 1);

		return val;

	}





	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Scroll Tracking
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	var uniqueRandoms = [];
	var scrollTimeout;

	$(window).scroll(function (event) {
		scrollingToggle();
	});

	function scrollingToggle(){
		scrollLocal = $(window).scrollTop();;

		//Fade Main Title
		var opic = 1 + (-Math.abs(scrollLocal/windowX))*3;
		$MainTitle.css("opacity", opic);
		
		//Find Local ID
		var ScrollToLocal,
			ComWhereAt = 0;


		switch (true) {

			case (scrollLocal > (contentHeight * 5.55)):
				ScrollToLocal = 6;
				showTitleFn(5);
			break;

			case (scrollLocal > (contentHeight * 4.55)):
				ScrollToLocal = 5;
				showTitleFn(4);
			break;
			
			case (scrollLocal > (contentHeight * 3.55)):
				ScrollToLocal = 4;
				showTitleFn(3);
			break;
			
			case (scrollLocal > (contentHeight * 2.55)):
				ScrollToLocal = 3;
				showTitleFn(2);
			break;
			
			case (scrollLocal > (contentHeight * 1.55)):
				ScrollToLocal = 2;
				showTitleFn(1);
			break;
			
			case (scrollLocal > (contentHeight * .55)):
				ScrollToLocal = 1;
				showTitleFn(0);
				if(onOrOff){
					$afterScrollTitle.css("opacity", '1');
					$mouseTool.css("visibility", 'visible');
					onOrOff = 0;
				}
			break;

			default:
				ScrollToLocal = 0;
				showTitleFn(-1);
				if(!onOrOff){
					$afterScrollTitle.css("opacity", '0');
					$mouseTool.css("visibility", 'hidden');
					onOrOff = 1;
				}

		}

		clearTimeout( scrollTimeout );
		scrollTimeout = setTimeout(function(){
							scrollendHandler(ScrollToLocal);
						}, 500);
	}


	// Snap Scroll Fn
	function scrollendHandler(where) {
		var whereTo = where*contentHeight;
		$('html, body').animate(
			{
				scrollTop: whereTo,
			},
			300
		);
		setTimeout(function(){
			clearTimeout( scrollTimeout );
		}, 300);
	}

	function showTitleFn(ComWhereAt) {

		if(ComWhereAt != OldAt && ComWhereAt > -2){


			OldAt = ComWhereAt;
			sittingAt = ComWhereAt; 
			var loc = ComWhereAt;

			paginationTo(loc+1);

			RunningScripBy(ComWhereAt);

			if(loc > -1){
				$bodyTitle.addClass('done');
				AddTtitleInput($TitleRow1 ,contentDeta[loc].row01);
				AddTtitleInput($TitleRow2 ,contentDeta[loc].row02);
				$TitleType.html(contentDeta[loc].jobtype);
			}

			setTimeout(function(){
				$bodyTitle.removeClass('done');
			}, 500);

		}
	}

	






	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Pagination Moving
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	var $pageIndicatorHolder = $('#pageIndicator .holder'),
		$PaginationPins = $('.swiper-pagination-bullet');

	function paginationTo(where){
		var whereAt = where*37;
		$pageIndicatorHolder.css('transform', 'translateX(-' + whereAt + 'px)');
		$PaginationPins.removeClass('swiper-pagination-bullet-active-main').removeClass('swiper-pagination-bullet-active-side');
		$('.swiper-pagination-bullet:eq('+where+')').addClass('swiper-pagination-bullet-active-main');
		$('.swiper-pagination-bullet:eq('+where+')').prev().addClass('swiper-pagination-bullet-active-side');
		$('.swiper-pagination-bullet:eq('+where+')').next().addClass('swiper-pagination-bullet-active-side');

	}

	$PaginationPins.on('click', function(){
		var scrollThere = $(this).attr('deta-local');
		scrollendHandler(scrollThere);
	});



	//-_-_-_-_-_-_-_-_-_-_-_-_-_-
	//	Run scrip According to Slde
	//-_-_-_-_-_-_-_-_-_-_-_-_-_-

	function RunningScripBy(index){

		if(index == -1){
			Scean01OnOff = 1;
		}else{
			Scean01OnOff = 0;
		} 

		if(index == 0){
			Scean02OnOff = 1;
		}else{
			Scean02OnOff = 0;
		} 

		if(index == 1){
			Scean03OnOff = 1;
		}else{
			Scean03OnOff = 0;
		} 

		if(index == 2){
			Scean04OnOff = 1;
		}else{
			Scean04OnOff = 0;
		}

		if(index == 3){
			Scean05OnOff = 1;
		}else{
			Scean05OnOff = 0;
		}

		if(index == 4){
			Scean06OnOff = 1;
		}else{
			Scean06OnOff = 0;
		}

		if(index == 5){
			Scean07OnOff = 1;
		}else{
			Scean07OnOff = 0;
		} 

	}

























});
