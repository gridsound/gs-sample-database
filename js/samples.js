"use strict";

function samples() {
	this.bank = {};
	this.currABSN = null;
}

samples.prototype = {
	_newAudioBlock( id, name ) {
		var uiBlock = new gsuiAudioBlock();

		uiBlock.name( name );
		uiBlock.datatype( "buffer" );
		document.getElementById( id ) || ( uiBlock.rootElement.id = id );
		return uiBlock;
	},
	_fillAudioBlock( uiBlock, id ){
		if ( this.bank[ id ][ "buffer" ] ) {
			var audbuf = this.bank[ id ][ "buffer" ];

			uiBlock.audbuf = audbuf;
			uiBlock.updateData( audbuf );
			uiBlock.rootElement.oncontextmenu = this.stop.bind( this );
		}
	},
	_addEventAudioBlock( elUiBlock ) {
		var id = elUiBlock.id || elUiBlock.getAttribute( "data-id" );

		if ( !elUiBlock.querySelector( ".btn" ) ) {
			var elBtnPlay = document.createElement( "div" ),
				elBtnSelect = document.createElement( "div" );

			elBtnPlay.classList.add( "btn", "play" );
			elBtnSelect.classList.add( "btn", "select" );
			elUiBlock.appendChild( elBtnPlay );
			elUiBlock.appendChild( elBtnSelect );
		}
		elUiBlock.querySelector( ".btn.play" ).onclick =
			this.play.bind( this, id );
		elUiBlock.querySelector( ".btn.select" ).onclick =
			selections.toggle.bind( selections, id );
	},
	play( id, when ) {
		this.stop();
		this.currABSN = ctx.createBufferSource();
		this.currABSN.connect( ctx.destination );
		this.currABSN.buffer = this.bank[ id ][ "buffer" ];
		this.currABSN.start(); // this.currABSN.start( when || 0 );
		document.getElementById( id ).gsuiAudioBlock.start();
		selections.selected.indexOf( id ) !== -1 &&
			selections.rootElement
				.querySelector( `[data-id="${ id }"]` )
				.gsuiAudioBlock.start();
	},
	stop() {
		this.currABSN && this.currABSN.stop();
		return false;
	},
	_loadSample( url ) {
		return fetch( url )
			.then( res => res.arrayBuffer() )
			.then( arrbuf => {
				return new Promise( ( resolve, reject ) => {
					ctx.decodeAudioData(
						arrbuf,
						audbuf => {
							resolve( audbuf );
						},
						reject );
				});
			});
	},
	loadSamples( el, pMetaData ) {
		pMetaData && pMetaData.then( ( metaData ) => {
			metaData.forEach( metaDatum => {
				var url = metaDatum.downloadURLs[ 0 ];
				var token = url.substring( url.indexOf( "token=" ) + "token=".length , url.length );
				var uiBlock = this._newAudioBlock( token, metaDatum.name );

				el.appendChild( uiBlock.rootElement );
				if ( token in this.bank ) {
					this._fillAudioBlock( uiBlock, token );
					this._addEventAudioBlock( uiBlock.rootElement );
					selections.isAlreadySelected( token );
				} else {
					this._loadSample( url ).then( audbuf => {
						this.bank[ token ] = metaDatum;
						this.bank[ token ][ "buffer" ] = audbuf;
						this._fillAudioBlock( uiBlock, token );
						this._addEventAudioBlock( uiBlock.rootElement );
						selections.isAlreadySelected( token );
					});
				}
			});
		});
	}
};