var uiBlock = [],
	i = 0;

for ( ; i < 10; ++i ) {
	uiBlock[ i ] = new gsuiAudioBlock();
	uiBlock[ i ].datatype( "buffer" );
	document.querySelector( "#result" ).append( uiBlock[ i ].rootElement );
}

//  -----------------

function appChangeView() {
	var clApp = document.getElementById( "app" ).classList,
		query = isValidHash( location.hash );

	clApp.toggle( "page1", !query );
	clApp.toggle( "page2", query );
	setInput();
}

function setInput() {
	document.querySelector( "input" ).value =
		isValidHash( location.hash )
			? location.hash.replace( /\+/g, " " ).substring( 2 )
			: "";
}

function isValidHash( hash ) {
	return hash && hash[ 0 ] === "#" && hash[ 1 ] === "/";
}

window.onhashchange = appChangeView;
document.querySelector( "form" ).onsubmit = function( e ){
	location.hash = "#/" + this.q.value.trim().replace( /\s+/g, "+" );
	return false;
};

appChangeView();
