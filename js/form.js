"use strict";

window.keywords = [
	"kick",
	"drum",
	"hat",
	"vocal",
	"snare",
	"impact",
	"tom",
	"clap",
	"builup",
	"glass",
	"bass",
	"perc",
	"hihat",
	"crash",
	"loop",
	"reverbe",
	"noise",
	"riser",
	"synth",
	"words",
	"chord",
	"arp",
];

function search() {
	setHash( this.value );
	fillResult.call(
		document.getElementById( "result" ),
		window.db.getSamples( this.value ) );
	return false;
}

function keywordsOnclick( query ) {
	document.querySelector( "input" ).value = query;
	document.querySelector( "form" ).onsubmit();
	return false;
}

function keyworkds() {
	keywords.forEach( ( k, i ) => {
		var a = document.createElement( "a" );

		a.innerText = k;
		a.href = "#"
		a.innerHTML += ' ';
		a.onclick = keywordsOnclick.bind( null, k );
		this.appendChild( a );
	});
}

function autoComplete( elForm ) {
	elForm.querySelectorAll( "a" )
		.forEach( k => {
			k.classList.toggle(
				"hide",
				!( this.value === "" || k.innerHTML.includes( this.value.toLowerCase() ) ) );
		});
}

function form() {
	var	elInput = this.querySelector( "input" ),
		elKeywords = this.querySelector( "#keywords" );

	keyworkds.call( elKeywords );
	this.onsubmit = search.bind( elInput );
	elInput.oninput = autoComplete.bind( elInput, this );
	search.call( elInput );
}