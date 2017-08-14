"use strict";

function sequencer( b, s ) {
	var root = this._init();

	this.rootElement = root;
	this.beats( b );
	this.steps( s );
}

sequencer.prototype = {
	beats( b ) {
		this.beats = b;
	},
	steps( s ) {
		this.steps = s;
	},
	newRow( id ) {
		var row = document.createElement( "div" ),
			measure = document.createElement( "div" ),
			beat = document.createElement( "div" ),
			title = document.createElement( "div" ),
			h5 = document.createElement( "h5" ),
			step = document.createElement( "div" );

		row.className = "row";
		row.id = id;
		title.className = "title";
		title.onclick = play.bind( null, selections.selected[ id ].audbuf );
		h5.textContent = selections.selected[ id ].data.name;
		measure.className = "measure";
		beat.className = "beat";
		step.className = "step";
		for ( var s = 0 ; s < this.steps ; ++s ) {
			beat.appendChild( step.cloneNode( true ) );
		}
		for ( var b = 0 ; b < this.beats ; ++b ) {
			measure.appendChild( beat.cloneNode( true ) );
		}

		title.appendChild( h5 );
		row.appendChild( title );
		row.appendChild( measure );
		this.rootElement.appendChild( row );
	},
	add( id ) {
		this.newRow( id );
	},
	remove( id ) {
		this.rootElement
			.removeChild( this.rootElement.querySelector( '#' + id ) );
	},
	clear() {
	},
	_init() {
		return document.getElementById( "sequencer" );
	}
};