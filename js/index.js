"use strict";

// Use to generate gsuiAudioBlock in #result
function generateAudioBlock( el ) {
	var uiBlock = [],
	i = 0;

	for ( ; i < 10; ++i ) {
		uiBlock[ i ] = new gsuiAudioBlock();
		uiBlock[ i ].datatype( "buffer" );
		el.append( uiBlock[ i ].rootElement );
	}
}

function onHashChange() {
	isValidHash( location.hash ) ? showPage( "page2" ) : showPage( "page1" );
	setInput();
}

function setHash( v ) {
	location.hash = "#/" + v.trim().replace( /\s+/g, "+" );
}

function isValidHash( hash ) {
	return hash && hash[ 0 ] === "#" && hash[ 1 ] === "/" && hash.length > 2;
}

function setInput() {
	document.querySelector( "input" ).value =
		isValidHash( location.hash )
			? location.hash.replace( /\+/g, " " ).substring( 2 )
			: "";
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

function showPage( page ) {
	var elApp = document.getElementById( "app" );

	elApp.className = "";
	elApp.classList.add( `${page}` );
}

function gsSampleDatabase() {
	var	elResult = document.getElementById( "result" );

	window.onhashchange = onHashChange;
	document.querySelector( "form" ).onsubmit = function() {
		setHash( this.q.value );
		return false;
	};

	generateAudioBlock( elResult );
	isValidHash( location.hash ) ? showPage( "page2" ) : showPage( "page1" );
	setInput();
	keywordsOnclick();
}

gsSampleDatabase();

