"use strict";

function removeChildren( el ) {
	el.innerHTML = "";
}

function addAudioBlock( el, sample ) {
	var uiBlock = new gsuiAudioBlock();

	uiBlock.name( sample.name );
	uiBlock.datatype( "buffer" );
	el.append( uiBlock.rootElement );
	return uiBlock;
}

function fillResult( samples ) {
	var uiBlocks = [],
		elResult = document.getElementById( "result" ),
		i = 0;

	removeChildren( elResult );
	for ( ; i < samples.length; ++i ) {
		uiBlocks[ i ] = addAudioBlock( elResult, samples[ i ] );
	}
	return uiBlocks;
}

function search( s ) {
	fillResult( window.db.getSamples( s ) );
}

function onHashChange() {
	showPage();
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

function showPage() {
	document.getElementById( "app" ).classList.toggle( "main", !isValidHash( location.hash ) );
}

function gsSampleDatabase() {
	var elForm = document.querySelector( "form" ),
		elResult = document.getElementById( "result" );

	window.onhashchange = onHashChange;
	elForm.onsubmit = function() {
		setHash( this.q.value );
		search( this.q.value );
		return false;
	};
	document.getElementById( "theme" ).onclick = function() {
		var clHtml = document.querySelector( "html" ).classList;

		clHtml.toggle( "dark" );
		clHtml.toggle( "light" );
		return false;
	};

	showPage();
	setInput();
	search( elForm.q.value );
	keywordsOnclick();
}

gsSampleDatabase();

