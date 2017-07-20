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

function keywordsOnclick() {
	var elsKeywords = document.getElementById( "keywords" ).children,
		i = 0;

	for ( ; i < elsKeywords.length ; ++i ) {
		elsKeywords[ i ].onclick = function() {
			document.querySelector( "input" ).value = this.textContent;
			document.querySelector( "form" ).onsubmit();
			return false;
		}
	};
}

function hashChange() {
	appChangeView();
	setInput();
}

window.onhashchange = hashChange;
document.querySelector( "form" ).onsubmit = function() {
	location.hash = "#/" + this.q.value.trim().replace( /\s+/g, "+" );
	return false;
};

appChangeView();
setInput();
keywordsOnclick();
