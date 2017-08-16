"use strict";

function removeChildren( el ) {
	el.innerHTML = "";
}

function setHash( v ) {
	location.hash = "#/" + v.trim().replace( /\s+/g, "+" );
}

function isValidHash( hash ) {
	return hash && hash[ 0 ] === "#" && hash[ 1 ] === "/" && hash.length > 2;
}

function switchTheme() {
	var clHtml = document.querySelector( "html" ).classList;

	clHtml.toggle( "dark" );
	clHtml.toggle( "light" );
	return false;
}

function switchPage() {
	var clApp = document.getElementById( "app" ).classList;
	
	clApp.toggle( "result", isValidHash( location.hash ) );
	clApp.toggle( "main", !isValidHash( location.hash ) );
	if ( isValidHash( location.hash ) ) {
		window.search.setInput( location.hash.replace( /\+/g, " " ).substring( 2 ) );
	} else {
		selections.clear();
		sequencer.clear();
		window.search.setInput( "" );
	}
}

function switchTabs( elPages, curr ) {
	for( var i = 0 ; i < this.length ; ++i ) {
		this[ i ].classList.remove( "active" );
		elPages[ i ].classList.remove( "active" );
	}
	this[ curr ].classList.add( "active" );
	elPages[ curr ].classList.add( "active" );
}

function selectionsTabs() {
	document
		.querySelectorAll( ".tab" )
		.forEach( ( tab, i, elTabs ) => {
			tab.onclick = switchTabs.bind(
				elTabs,
				document.querySelectorAll( ".tab-content" ),
				i );
		});
}

function gsSampleDatabase() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	window.onhashchange = switchPage;
	window.search = new search(
		document.querySelector( "form" ),
		document.querySelector( "input" ),
		document.getElementById( "keywords" ),
		document.getElementById( "result" )
	);
	window.samples = new samples();
	window.selections = new selections();
	window.sequencer = new sequencer( 4, 4 );
	window.ctx = new window.AudioContext;
	document.getElementById( "theme" ).onclick = switchTheme;

	switchPage();
	selectionsTabs();
	isValidHash( location.hash ) && window.search._evt_send();
}

gsSampleDatabase();
