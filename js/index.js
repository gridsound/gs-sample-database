var uiBlock = [];

for ( i = 0 ; i < 10 ; i++ ) {

	uiBlock[ i ] = new gsuiAudioBlock();

	document.querySelector( "#result" ).append( uiBlock[ i ].rootElement );
	uiBlock[ i ].datatype( "buffer" );
}

/** /
fetch( "https://gridsound.github.io/assets/demo-files/120bpm-4s.wav" )
	.then( res => res.arrayBuffer() )
	.then( arrbuf => ctx.decodeAudioData( arrbuf ) )
	.then( audbuf => {
		uiBlock.name( "An audio block" );
		uiBlock.updateData( audbuf, 0, audbuf.duration );
	} );
/**/
