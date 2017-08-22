"use strict";

function sequencer( b, s ) {
	var root = this._init();

	this.beats( b );
	this.steps( s );
	this.rootElement = root;
	this.rootElement.seqRows = document.getElementById( "seq-rows" );

	this.pattern = {};

	this.elMenu = document.getElementById( "seq-menu" );
	// Play/Stop button
	this.elMenu.elBtnPlay = this.elMenu.querySelector( "#state" );
	this.elMenu.elBtnPlay.onclick = this._state.bind( this, this.elMenu.elBtnPlay );

	// Slider BPM
	this.elMenu.uiSlider = new gsuiSlider();
	document.getElementById( "sliderWrap" ).appendChild( this.elMenu.uiSlider.rootElement );
	this.elMenu.uiSlider.oninput = this._evt_updateBpm.bind( this );
	this.elMenu.uiSlider.resize( 150, 24 );
	this.elMenu.uiSlider.options( { min: 10, max: 240, step: 1, value: 120 } );
	this.elMenu.elBpm = this.elMenu.querySelector( "#bpm" );
	this._evt_updateBpm();
}

sequencer.prototype = {
	_evt_updateBpm() {
		this.elMenu.elBpm.textContent = this.elMenu.uiSlider.value;
	},
	_evt_play( ) {},
	_evt_stop( ) {},
	_state( elBtn ) {
		elBtn.classList.contains( "play" ) && this._evt_play()
		elBtn.classList.contains( "stop" ) && this._evt_stop()
		elBtn.classList.toggle( "stop" );
		elBtn.classList.toggle( "play" );
	},
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
			sName = samples.bank[ id ].name;

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
		this.pattern.id = Array( this.steps * this.beats ).fill( 0 );
	},
	remove( id ) {
		this.rootElement
			.seqRows
			.removeChild( this.rootElement.querySelector( `[data-id="${id}"]` ) );
		delete this.pattern.id;
	},
	clear() {
		this.rootElement.seqRows.innerHTML = '';
		this.selected = [];
	},
	toggleStep( elStep, id, s ) {
		elStep.classList.toggle( "active" );
		this.pattern.id.s ^= 1;
	},
	_init() {
		return document.querySelector( ".sequencer" );
	}
};