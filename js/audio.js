"use strict";

function stop() {
	if ( window.currABSN ) {
		currABSN.stop();
	}
	return false;
}

function play( audbuf ) {
	stop();
	window.currABSN = ctx.createBufferSource();
	currABSN.connect( ctx.destination );
	currABSN.buffer = audbuf;
	currABSN.start();
	return false;
}

function addAudioBlock( el, sample ) {
	var uiBlock = new gsuiAudioBlock();

	uiBlock.ondrag = function() {};
	fetch( sample.url )
		.then( res => res.arrayBuffer() )
		.then( arrbuf => ctx.decodeAudioData( 
			arrbuf,
			audbuf => {
				uiBlock.name( sample.name );
				uiBlock.datatype( "buffer" );
				uiBlock.rootElement.id = sample.id;
				uiBlock.updateData( audbuf, 0, audbuf.duration );
				uiBlock.rootElement.onclick = play.bind( null, audbuf );
				uiBlock.rootElement.oncontextmenu = stop
				uiBlock.rootElement.ondblclick = selections.toggle.bind( selections, uiBlock.rootElement );
			})
		)
		.then( _ => selections.isAlreadySelected( uiBlock.rootElement ) );
	el.append( uiBlock.rootElement );
	return uiBlock;
}

function fillResult( samples ) {
	var uiBlocks = [],
		i = 0;

	removeChildren( this );
	for ( ; i < samples.length; ++i ) {
		uiBlocks[ i ] = addAudioBlock( this, samples[ i ] );
	}
	return uiBlocks;
}