function parse(data){
	var parser=new ColladaParser();
	parser.parseCollada(data);
}




var ColladaParser=function(){
	this.parser = new DOMImplementation();
	
	this.parseCollada=function(data){
	
		//create xmldocument 
		var domDoc = this.parser.loadXML(data.value);
		//getting rootnode
		var docRoot = domDoc.getDocumentElement();
		var geometryNode=docRoot.selectNodeSet("//library_geometries/geometry/mesh");
		
		//step 1 read VERTEX ******************************************************************************
		
		var node = geometryNode.item(0).selectNodeSet("//polylist/input[@semantic=VERTEX]");
		//read vertexOffset
		var vertexOffset=node.item(0).getAttributes().getNamedItem("offset").getNodeValue();
		alert("vertexOffset: " + vertexOffset);
		
		//read vertices nodename 
		var vertexId=node.item(0).getAttributes().getNamedItem("source").getNodeValue();
		//remove '#'
		vertexId=this.substringSign(vertexId,'#');
		//getting node vertices
		node=geometryNode.item(0).selectNodeSet("//vertices[@id=" + vertexId+ "]");
		node=node.item(0).getFirstChild();
		//read id of position-array
		vertexId=node.getAttributes().getNamedItem("source").getNodeValue();
		//remove '#'
		vertexId=this.substringSign(vertexId,'#');
		
		//step 2 read NORMALS *******************************************************************************
		
		//read normalid
		node = geometryNode.item(0).selectNodeSet("//polylist/input[@semantic=NORMAL]");
		//read normalOffset
		var normalOffset=node.item(0).getAttributes().getNamedItem("offset").getNodeValue();
		alert("normalOffset: " + normalOffset);
		var normalId=node.item(0).getAttributes().getNamedItem("source").getNodeValue();
		//remove '#'
		normalId=this.substringSign(normalId,'#');
		
		
		//step 3 read sources *******************************************************************************
		
		var sources=docRoot.selectNodeSet("//source");
		for(i=0;i<sources.length;i++){
          node=sources.item(i);    
		  nodeId=node.getAttributes().getNamedItem("id").getNodeValue();	
		  //read accessor
			tempNode=node.selectNodeSet("//technique_common/accessor");
			source=tempNode.item(0).getAttributes().getNamedItem("source").getNodeValue();
		  
		  if(nodeId==vertexId){
			  //node with vertices found
			  sourceVerticeName=nodeId;
			  source=this.substringSign(source,"#");
			  tempNode=node.selectNodeSet("//float_array[@id=" + source + "]");
			  vertices=tempNode.item(0).getFirstChild().getNodeValue();
			  
			  //replace whitespaces with 
			  vertices=vertices.replace(/ /g,',');
			  alert("vertices: " + vertices);
			}else if (nodeId==normalId){
			    sourceNormalsName=nodeId;
				//read normals
				//TODO auslagern
				source=this.substringSign(source,"#");
				tempNode=node.selectNodeSet("//float_array[@id=" + source + "]");
				normals=tempNode.item(0).getFirstChild().getNodeValue();
				//replace whitespaces with 
				normals=normals.replace(/ /g,',');
				alert("normals: " + normals);
			}else{
				alert("unknown source found");
			}			
		}
		
		//step 4 read indicies *****************************************************************************
		var vertexIndicies;
		var normalsIndicies;
		
		//read polylist node p
		node= geometryNode.item(0).selectNodeSet("//polylist/p");
		var indicies=node.item(0).getFirstChild().getNodeValue();
		//replace whitespaces with 
		normals=normals.replace(/ /g,',');
		alert(indicies);
		//iterate thr. indicies
		//for (indie)
		
	}
	
	this.parseColladaOld = function(data){
	  	
	  var domDoc = this.parser.loadXML(data.value);
	  var docRoot = domDoc.getDocumentElement();
	
		//get vertices in collada document
		var srcVertices = docRoot.selectNodeSet("//library_geometries/geometry/mesh/vertices/input");
		var attrVerticeSource=srcVertices.item(0).getAttributes().getNamedItem("source").getNodeValue();
		attrVerticeSource=this.substringSign(attrVerticeSource,"#");
	
		var sources=docRoot.selectNodeSet("//library_geometries/geometry/mesh/source");
		var nodeList=sources.item(0).getChildNodes();
		
		var nodeId;
		var tempNode;
		//object draus machen
		var vertices;
		var normals;
		var node;
		
		//holds the name of verticearray found under accessor
		var verticeArrayName;
		
		var sourceVerticeName;
		var sourceNormalsName;
		var source;
		
		for(i=0;i<sources.length;i++){
          node=sources.item(i);    
		  nodeId=node.getAttributes().getNamedItem("id").getNodeValue();	
		  //read accessor
			tempNode=node.selectNodeSet("//technique_common/accessor");
			source=tempNode.item(0).getAttributes().getNamedItem("source").getNodeValue();
		  
		  if(nodeId==attrVerticeSource){
			  //node with vertices found
			  sourceVerticeName=nodeId;
			  source=this.substringSign(source,"#");
			  tempNode=node.selectNodeSet("//float_array[@id=" + source + "]");
			  vertices=tempNode.item(0).getFirstChild().getNodeValue();
			  
			  //replace whitespaces with 
			  vertices=vertices.replace(/ /g,',');
			  alert(vertices);
			}else{
			    sourceNormalsName=nodeId;
				//read normals
				//TODO auslagern
				source=this.substringSign(source,"#");
				tempNode=node.selectNodeSet("//float_array[@id=" + source + "]");
				normals=tempNode.item(0).getFirstChild().getNodeValue();
				//replace whitespaces with 
				normals=normals.replace(/ /g,',');
				alert(normals);
			}	
		}
		//zuerst auslesen
		//mit source
		var node = docRoot.selectNodeSet("//library_geometries/geometry/mesh/polylist/input[@source=" + sourceVerticeName + "]");
		alert(node);
		
	}
	
	this.substringSign = function(str,sign){
		posi=str.indexOf(sign);
		if(posi!= -1){
			return str.substring(posi + 1 ,str.length);
		}
	}

	this.parseGeometry = function(geometryXML){
		alert(geometryXML);
	}
}
    