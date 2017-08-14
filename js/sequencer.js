"use strict";

function sequencer( b, s ) {
	var root = this._init();

	this.rootElement = root;
	this.beats( b );
	this.steps( s );
	this.rows = {};
}

sequencer.prototype = {
	beats( b ) {
		this.beats = b;
	},
	steps( s ) {
		this.steps = s;
	},
	newRow( sId ) {
		var elRow = document.createElement( "div" ),
			elMeasure = document.createElement( "div" ),
			elTitle = document.createElement( "div" ),
			elH5 = document.createElement( "h5" );

		elRow.id = sId;
		elRow.className = "seq-row";

		elTitle.className = "title";
		elTitle.onclick = play.bind( null, selections.selected[ sId ].audbuf );
		elH5.textContent = selections.selected[ sId ].data.name;
		elMeasure.className = "measure";

		for ( var s = 0 ; s < this.steps * this.beats ; ++s ) {
			var elStep = document.createElement( "div" );

			elStep.className = "step";
			elStep.onclick = this.toggleStep.bind( this, elStep, sId, s );
			elMeasure.appendChild( elStep );
		}
		elTitle.appendChild( elH5 );
		elRow.appendChild( elTitle );
		elRow.appendChild( elMeasure );
		this.rootElement.appendChild( elRow );
	},
	add( sId ) {
		this.newRow( sId );
		this.rows[ sId ] = { steps: Array( this.steps * this.beats ).fill( 0 ) };
	},
	remove( sId ) {
		this.rootElement
			.removeChild( this.rootElement.querySelector( '#' + sId ) );
		delete this.rows[ sId ];
	},
	clear() {
		this.rootElement.innerHTML = '';
		this.selected = [];
	},
	toggleStep( elStep, sId, s ) {
		elStep.classList.toggle( "active" );
		this.rows[ sId ][ "steps" ][ s ] ^= 1;
	},
	_init() {
		return document.getElementById( "sequencer" );
	}
};