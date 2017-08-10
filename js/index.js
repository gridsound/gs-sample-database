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

function addAudioBlock( el, sample ) {
	var uiBlock = new gsuiAudioBlock();

	uiBlock.ondrag = function() {};
	fetch( sample.url )
		.then( res => res.arrayBuffer() )
		.then( arrbuf => ctx.decodeAudioData( arrbuf ) )
		.then( audbuf => {
			uiBlock.name( sample.name );
			uiBlock.datatype( "buffer" );
			uiBlock.rootElement.id = sample.id;
			uiBlock.updateData( audbuf, 0, audbuf.duration );
			uiBlock.rootElement.ondblclick = function() {
				selections.toggle( uiBlock.rootElement );
			}
		}).then( _ => {
			selections.isAlreadySelected( uiBlock.rootElement );
		});
	el.append( uiBlock.rootElement );
	return uiBlock;
}

function fillResult( samples ) {
	var uiBlocks = [],
		elResult = document.getElementById( "result" ),
		i = 0;

	removeChildren( elResult );
	lg( selections.content );
	for ( ; i < samples.length; ++i ) {
		uiBlocks[ i ] = addAudioBlock( elResult, samples[ i ] );
	}
	return uiBlocks;
}

function search( s ) {
	fillResult( window.db.getSamples( s ) );
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

function gsSampleDatabase() {
	var elForm = document.querySelector( "form" ),
		elResult = document.getElementById( "result" );

	window.selections = new selections();
	window.onhashchange = onHashChange;
	window.ctx = new AudioContext();
	keywordsOnclick();

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

	onHashChange();
	search( elForm.q.value );
}

gsSampleDatabase();
