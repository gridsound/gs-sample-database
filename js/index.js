var uiBlock = [];

for ( i = 0 ; i < 10 ; i++ ) {

	uiBlock[ i ] = new gsuiAudioBlock();

	document.querySelector( "#result" ).append( uiBlock[ i ].rootElement );
	uiBlock[ i ].datatype( "buffer" );
}

/*  -----------------  */

appChangeView = function() {
	var elApp = document.getElementById( "app" );

	if ( window.location.hash ) {
		elApp.classList.remove( "page1" );
		elApp.classList.add( "page2" );
		fillInput();
	} else {
		elApp.classList.remove( "page2" );
		elApp.classList.add( "page1" );
	}
}

fillInput = function() {
	var
		hash = window.location.hash,
		elInput = document.querySelector( "input" )
	;

	if ( hash ){
		q = hash.replace( /^\+/g, " " ).replace( /\/$/g, "" )
		elInput.value = q.substring( 1 );
	}
}

init = function() {
	appChangeView();
}

init();

window.onhashchange = appChangeView;

document.querySelector( "form" ).onsubmit = function( e ){
	window.location.hash = `#${this.q.value.trim().replace( /\s+/g, "+" )}/`;
	return false;
};

/** /
fetch( "https://gridsound.github.io/assets/demo-files/120bpm-4s.wav" )
	.then( res => res.arrayBuffer() )
	.then( arrbuf => ctx.decodeAudioData( arrbuf ) )
	.then( audbuf => {
		uiBlock.name( "An audio block" );
		uiBlock.updateData( audbuf, 0, audbuf.duration );
	} );
/**/
