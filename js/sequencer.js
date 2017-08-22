"use strict";

function sequencer( b, s ) {
	var root = this._init();

	this.rootElement = root;
	this.rootElement.seqRows = this.rootElement.querySelector( ".seq-rows" );
	this.beats( b );
	this.steps( s );
	this.pattern = {};
}

sequencer.prototype = {
	beats( b ) {
		this.beats = b;
	},
	steps( s ) {
		this.steps = s;
	},
	newRow( id ) {
		var elRow = document.createElement( "div" ),
			elMeasure = document.createElement( "div" ),
			elTitle = document.createElement( "div" ),
			elH5 = document.createElement( "h5" ),
			sName = samples.bank[ id ][ "name" ];

		elRow.setAttribute( "data-id", id );
		elRow.className = "seq-row";
		elTitle.className = "title";
		elH5.textContent = sName;
		elMeasure.className = "measure";

		elTitle.onclick = samples.play.bind( samples, id );

		for ( var s = 0 ; s < this.steps * this.beats ; ++s ) {
			var elStep = document.createElement( "div" );

			elStep.className = "step";
			elStep.onclick = this.toggleStep.bind( this, elStep, id, s );
			elMeasure.appendChild( elStep );
		}
		elTitle.appendChild( elH5 );
		elRow.appendChild( elTitle );
		elRow.appendChild( elMeasure );
		this.rootElement.seqRows.appendChild( elRow );
	},
	add( id ) {
		this.newRow( id );
		this.pattern[ id ] = Array( this.steps * this.beats ).fill( 0 );
	},
	remove( id ) {
		this.rootElement
			.seqRows
			.removeChild( this.rootElement.querySelector( `[data-id="${id}"]` ) );
		delete this.pattern[ id ];
	},
	clear() {
		this.rootElement.innerHTML = '';
		this.selected = [];
	},
	toggleStep( elStep, id, s ) {
		elStep.classList.toggle( "active" );
		this.pattern[ id ][ s ] ^= 1;
	},
	_init() {
		return document.querySelector( ".sequencer" );
	}
};