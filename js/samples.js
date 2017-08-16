"use strict";

function samples() {
	this.bank = {};
	this.currABSN = null;
}

samples.prototype = {
	_loadSample( s ) {
		return fetch( s.url )
			.then( res => res.arrayBuffer() )
			.then( arrbuf => {
				return new Promise( ( resolve, reject ) => {
					ctx.decodeAudioData(
						arrbuf,
						audbuf => {
							this.bank[ s.id ] = s;
							this.bank[ s.id ][ "buffer" ] = audbuf;
							resolve( audbuf ); },
						reject );
				});
			});
	},
	_newAudioBlock( id, name ) {
		var uiBlock = new gsuiAudioBlock();

		uiBlock.name( name );
		uiBlock.datatype( "buffer" );
		uiBlock.rootElement.id = id;
		return uiBlock;
	},
	_fillAudioBlock( uiBlock, id ){
		if ( this.bank[ id ][ "buffer" ] ) {
			var audbuf = this.bank[ id ][ "buffer" ];

			uiBlock.audbuf = audbuf;
			uiBlock.updateData( audbuf, 0, audbuf.duration );
			uiBlock.rootElement.oncontextmenu = this.stop.bind( this );
		}
	},
	_addEventAudioBlock( elUiBlock ) {
		if ( !elUiBlock.querySelector( ".btn" ) ) {
			var elBtnPlay = document.createElement( "div" ),
				elBtnSelect = document.createElement( "div" );

			elBtnPlay.classList.add( "btn", "play" );
			elBtnSelect.classList.add( "btn", "select" );
			elUiBlock.appendChild( elBtnPlay );
			elUiBlock.appendChild( elBtnSelect );
		}
		elUiBlock.querySelector( ".btn.play" ).onclick =
			this.play.bind( this, elUiBlock.id );
		elUiBlock.querySelector( ".btn.select" ).onclick =
			selections.toggle.bind( selections, elUiBlock.id );
	},
	play( id, when ) {
		this.stop();
		this.currABSN = ctx.createBufferSource();
		this.currABSN.connect( ctx.destination );
		this.currABSN.buffer = this.bank[ id ][ "buffer" ];
		this.currABSN.start(); // this.currABSN.start( when || 0 ); 
	},
	stop() {
		this.currABSN && this.currABSN.stop();
		return false;
	},
	loadSamples( el, samples ) {
		samples.forEach( s => {
			var uiBlock = this._newAudioBlock( s.id, s.name );

			el.appendChild( uiBlock.rootElement );
			if ( s.id in this.bank ) {
				this._fillAudioBlock( uiBlock, s.id );
				this._addEventAudioBlock.call( this, uiBlock.rootElement );
				selections.isAlreadySelected( s.id );
			} else {
				this._loadSample( s, uiBlock )
					.then( _ => {
						this._fillAudioBlock( uiBlock, s.id );
						this._addEventAudioBlock( uiBlock.rootElement );
						selections.isAlreadySelected( s.id );
					});
			}
		});
	}
};