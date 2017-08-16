"use strict";

function selections() {
	var root = this._init();

	this.rootElement = root;
	this.selected = [];
}

selections.prototype = {
	toggle( id ) {
		if ( this.selected.indexOf( id ) === -1 ) {
			this.add( id );
			// sequencer.add( elUiBlock );
		} else {
			this.remove( id );
			// sequencer.remove( elUiBlock );
		}
		document.querySelector( "#" + id ).classList.toggle( "selected" );
	},
	cloneElUiBlock( id ) {
		var elClone = document.getElementById( id ).cloneNode( true );

		elClone.classList.add( "clone", "selected" );
		samples._addEventAudioBlock( elClone );
		return elClone;
	},
	add( id ) {
		this.rootElement.appendChild( this.cloneElUiBlock( id ) );
		this.selected.push( id );
	},
	remove( id ) {
		this.rootElement.removeChild( this.rootElement.querySelector( `#${id}.clone` ) );
		this.selected.splice( id, 1 );
	},
	clear() {
		this.rootElement.innerHTML = '';
		this.selected = [];
	},
	_init() {
		return document.getElementById( "selected" );
	}
};