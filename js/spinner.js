var canvas,
	ctx,
	width,
	height,
	lines,
	tick;

function line( opt ) {
	this.xBase = width / 2;
	this.yBase = height / 2;
	this.x = this.xBase;
	this.y = this.yBase;
	this.w = 100;
	this.h = 4;
	this.hue = opt.hue;
	this.angle = opt.angle;
	this.offset = 85 + opt.offset;
	this.alpha = 1;
	this.scale = 1;
}

line.prototype.step = function( i ) {
	this.x = this.xBase + Math.sin( ( tick + this.offset ) / 20 ) * Math.cos( this.angle ) * this.w;
	this.y = this.yBase + Math.sin( ( tick + this.offset ) / 20 ) * Math.sin( this.angle ) * this.w;
};

line.prototype.draw = function( i ) {
	ctx.save();
	ctx.translate( this.x, this.y );
	ctx.rotate( this.angle );
	ctx.scale( this.scale, 1 );
	ctx.fillStyle = 'hsla(' + this.hue + ', 50%, 55%, ' + this.alpha + ')';
	ctx.fillRect( -this.w / 2, -this.h / 2, this.w, this.h );
	ctx.fillRect( this.w, -1, this.w / 4, 2 );
	ctx.restore();
};

function init() {
	canvas = document.getElementById( 'canvas' );
	ctx = canvas.getContext( '2d' );
	lines = [];
	reset();
	loop();
}

function reset() {
	width = window.innerWidth;
	height = window.innerHeight;
	tick = 0;
	lines.length = 0;
	canvas.width = width;
	canvas.height = height;
	ctx.globalCompositeOperation = 'lighter';
	for( var i = 0, length = 20; i < length; i++ ) {
		lines.push( new line({
			hue: ( i / length ) * 360,
			angle: ( -i / ( length - 1 ) ) * Math.PI * 5,
			offset: i * 5
		}));
	}
}

function step() {
	var i = lines.length;
	while( i-- ) {
		lines[ i ].step( i );
	}
}

function clear() {
	ctx.clearRect( 0, 0, width, height );
}

function draw() {
	ctx.save();
	var i = lines.length;
	while( i-- ) {
		lines[ i ].draw( i );
	}
	ctx.restore();
}

function loop() {
	requestAnimationFrame( loop );
	step();
	clear();
	draw();
	tick++;
}

function onresize() {
	reset();
}

window.addEventListener( 'resize', onresize );

init();
