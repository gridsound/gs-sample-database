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

	lg( "appChangeView" );
	clApp.toggle( "page1", !query );
	clApp.toggle( "page2", query );
}

function setInput() {
	lg( "setInput" );
	document.querySelector( "input" ).value =
		isValidHash( location.hash )
			? location.hash.replace( /\+/g, " " ).substring( 2 )
			: "";
}

function isValidHash( hash ) {
	return hash && hash[ 0 ] === "#" && hash[ 1 ] === "/";
}

function keywordsOnclick() {
	var elsKeywords = document.getElementById( "keywords" ).children,
		i = 0;

	for ( ; i < elsKeywords.length ; ++i ) {
		elsKeywords[ i ].onclick = function() {
			document.querySelector( "input" ).value = this.textContent;
			document.querySelector( "form" ).onsubmit();
		}
	};
}

window.onhashchange = appChangeView;
document.querySelector( "form" ).onsubmit = function() {
	lg( "onsubmit" );
	location.hash = "#/" + this.q.value.trim().replace( /\s+/g, "+" );
	return false;
};

appChangeView();
setInput();
keywordsOnclick();
