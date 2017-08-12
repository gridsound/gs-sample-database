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

function initKeyworkds() {
	keywords.forEach( function( k, i ) {
		document
			.getElementById( "keywords" )
			.innerHTML += `<a href="#">${k}</a> `;
	});
}

function autoComplete( elForm ) {
	elForm.querySelectorAll( "a" )
		.forEach( k => {
			k.classList.toggle(
				"hide",
				!( this.value === "" || k.innerHTML.startsWith( this.value ) ) );
		});
}