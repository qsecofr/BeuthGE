/**
 * Vertex buffer with models/shapes.
 * The buffers are used in the scene.
 * WebGL:
 * A buffer is a bit of memory on the graphics card.
 * gl.bindBuffer: Any following operations  act on specified buffers.
 * gl.bufferData: create and initialize a buffer object's data store.
 */


function Buffer(gl) {	

	// Public variables.
	this.triangleVertexPositionBuffer;
	this.triangleVertexColorBuffer;
	//
	this.squareVertexPositionBuffer;
	this.squareVertexColorBuffer;

	this.init02 = function(){
		this.triangleVertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexColorBuffer);
		var colors = [
		              1.0, 0.0, 0.0, 1.0,
		              0.0, 1.0, 0.0, 1.0,
		              0.0, 0.0, 1.0, 1.0
		              ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		this.triangleVertexColorBuffer.itemSize = 4;
		this.triangleVertexColorBuffer.numItems = 3;

		this.squareVertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexColorBuffer);
		colors = [];
		for (var i=0; i < 4; i++) {
			colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		this.squareVertexColorBuffer.itemSize = 4;
		this.squareVertexColorBuffer.numItems = 4;		
	};

	// For lesson 01.
	this.init01 = function(){
		// Create buffer for triangle vertex positions.
		this.triangleVertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
		var vertices = [
		                0.0,  1.0,  0.0,
		                -1.0, -1.0,  0.0,
		                1.0, -1.0,  0.0
		                ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		this.triangleVertexPositionBuffer.itemSize = 3;
		this.triangleVertexPositionBuffer.numItems = 3;

		// Create buffer for square vertex positions.
		this.squareVertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
		vertices = [
		            1.0,  1.0,  0.0,
		            -1.0,  1.0,  0.0,
		            1.0, -1.0,  0.0,
		            -1.0, -1.0,  0.0
		            ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		this.squareVertexPositionBuffer.itemSize = 3;
		this.squareVertexPositionBuffer.numItems = 4;
	};
}

