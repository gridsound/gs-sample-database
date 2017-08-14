"use strict";

function selections() {
	var root = this._init();

	this.rootElement = root;
	this.selected = {};
}

selections.prototype = {
	isAlreadySelected( elUiBlock ) {
		if ( this.selected.hasOwnProperty( elUiBlock.id ) ) {
				elUiBlock.classList.toggle( "selected" );
		}
	},
	toggle( uiBlock ) {
		if ( uiBlock.rootElement.classList.contains( "selected" ) ) {
			this.remove( uiBlock.rootElement.id );
			sequencer.remove( uiBlock.rootElement.id );
		} else {
			if ( !this.selected.hasOwnProperty( uiBlock.rootElement.id ) ) {
				this.add( uiBlock );
				sequencer.add( uiBlock.rootElement.id );
			}
		}
		uiBlock.rootElement.classList.toggle( "selected" );
	},
	add( uiBlock ) {
		this.rootElement.appendChild( uiBlock.rootElement.cloneNode( true ) );
		this.selected[ uiBlock.rootElement.id ] = uiBlock;
	},
	remove( id ) {
		this.rootElement.removeChild( this.rootElement.querySelector( "#" + id ) );
		delete this.selected[ id ];
	},
	clear() {
		this.rootElement.innerHTML = '';
		this.selected = [];
	},
	_init() {
		return document.getElementById( "selected" );
	}
};