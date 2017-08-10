"use strict";

function selections() {
	var root = this._init();

	this.rootElement = root;
	this.content = [];
}

selections.prototype = {
	isSelected( id ) {
		return ( this.content.indexOf( id ) !== -1 );
	},
	isAlreadySelected( elUiBlock ) {
		if ( this.isSelected( elUiBlock.id ) ) {
				elUiBlock.classList.toggle( "selected" );
		}
	},
	toggle( elUiBlock ) {
		if ( elUiBlock.classList.contains( "selected" ) ) {
			this.remove( elUiBlock.id );
		} else {
			if ( !this.isSelected( elUiBlock.id ) ) {
				this.add( elUiBlock.cloneNode( true ) );
			}
		}
		elUiBlock.classList.toggle( "selected" );
	},
	add( elUiBlock ) {
		this.rootElement.appendChild( elUiBlock );
		this.content.push( elUiBlock.id );
	},
	remove( id ) {
		this.rootElement.removeChild( this.rootElement.querySelector( "#" + id ) );
		this.content.splice( this.content.indexOf( id ), 1 );
	},
	clear() {
		this.rootElement.innerHTML = '';
		this.content = [];
	},
	_init() {
		return document.getElementById( "selected" );
	}
};