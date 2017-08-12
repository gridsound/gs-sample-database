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
	
	clApp.toggle( "main", !isValidHash( location.hash ) );
	clApp.toggle( "result", isValidHash( location.hash ) );
	if ( clApp.contains( "main" ) ){
		selections.clear();
	}
}

function setInput() {
	document.querySelector( "input" ).value =
		isValidHash( location.hash )
			? location.hash.replace( /\+/g, " " ).substring( 2 )
			: "";
}

function onHashChange() {
	switchPage();
	setInput();
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
	window.onhashchange = onHashChange;
	window.selections = new selections();
	window.ctx = new window.AudioContext;
	document.getElementById( "theme" ).onclick = switchTheme;

	onHashChange();
	form.call( document.querySelector( "form" ) );
	selectionsTabs();
}

gsSampleDatabase();
