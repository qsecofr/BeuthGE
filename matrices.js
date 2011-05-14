/**
 * Container class for the matrices.
 */

function Matrices() {
	// Public variables.
	//
	// Projection matrix.
	this.pMatrix = mat4.create();
	// Model-View matrix.
	this.mvMatrix = mat4.create();
}

