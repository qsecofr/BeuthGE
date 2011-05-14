/**
 * Main entry point and event loop.
 * Initas WebGL object gl. 
 * Init animation of rendering.
 * Init user interaction, event handling.
 * No WebGL commands here.
 */

//This is the entry point for the web application
function webGLStart() {
	var canvas = document.getElementById("canvas");
	resize(canvas); // Resize canvas according to window size.

	var gl = initGL(canvas);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	// Matrices object contains model-view and perspective matrixes.
	var matrices = new Matrices();
	// Initialize shader object with shader program, vertex an fragment shader.
	var shader = new Shader(gl, "shader-vs", "shader-fs");
	// Initialize buffer object with vertex buffers.
	var buffer = new Buffer(gl);
	buffer.init01();	
	buffer.init02();
	// The scene object does the drawing.
	var scene = new Scene(canvas, gl, matrices, shader, buffer);
	// Do thing that should happen only once.
	scene.init();
	
	// Initialize event handling.
	var eventHandler = new EventHandler(canvas);
	eventHandler.init();
	
	// start main render, animation and event loop.
	tick(scene, eventHandler);
}

function initGL(canvas) {
	try {
		var gl = canvas.getContext("experimental-webgl");
		gl.viewport(0, 0, canvas.width, canvas.height);
	} catch(e) {
	}
	if (!gl) {
		alert("No gl context: Could not initialise WebGL.");
	}
	return gl;
}

function resize(canvas) {
	// Use (almost) all the window for the canvas.
	var border = 0;
	canvas.width = window.innerWidth-border;
	canvas.height = window.innerHeight-border;
	window.addEventListener('resize', resize, false);
};  


//  Render and event loop.
function tick(scene, eventHandler) {
	// Start timer.
	//requestAnimationFrame();
	eventHandler.handleEvents();
	scene.draw();
}






