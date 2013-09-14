//ABSTRACT CLASS AudioTile
var AudioTile = function(domElement) {
	this.domElement = domElement;
	this.source = domElement.attr("data-src");
}

var BandTile = function(domElement) {
	this.prototype = new AudioTile(domElement);
	this.bName = domElement.find("h1").html();
	this.aName = domElement.attr("data-sample-aName");
	this.sName = domElement.attr("data-sample-sName");
}

var AlbumTile = function(domElement) {
	this.prototype = new AudioTile(domElement);
	this.sName = domElement.find("tr:first td.name").html();
	this.aName = domElement.find("h1").html();
	this.bName = domElement.attr("data-bName");
}
