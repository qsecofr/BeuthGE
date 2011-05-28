// Import modules

function startScene() {

	var verticalFieldOfView = 45;
	var framerate = 30.0;
	var canvas = document.getElementById("canvas");
	canvas.width = 800;
	canvas.height = 800;
	
	var gl = initGL(canvas);

	// Build scene graph
	var sceneGraph = new Group();
	
	var sep1 = new Separator();
	sep1.addChild(new Translation(-2.8, 1, -20));
	
	var myModel=new Model('cone.json');
	sep1.addChild(myModel);
	
	sceneGraph.addChild(sep1);
	
	// Create scene
	var scene = new Scene(gl, sceneGraph, canvas, verticalFieldOfView, framerate);	
	// Start running the scene
	scene.start();
}

