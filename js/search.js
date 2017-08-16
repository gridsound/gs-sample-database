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

function search( elForm, elInput, elKeywords, elResult ) {
	this.elForm = elForm;
	this.elInput = elInput;
	this.elResult = elResult;
	this.elKeywords = elKeywords;

	this._keywords();
	this.elForm.onsubmit = this._evt_send.bind( this );
	this.elInput.oninput = this._evt_autoComplete.bind( this );
}

search.prototype = {
	setInput( v ) {
		this.elInput.value = v;
	},
	_clearResult() {
		this.elResult.innerHTML = "";
	},
	_keywords() {
		keywords.forEach( ( k, i ) => {
			var a = document.createElement( "a" );

			a.innerText = k;
			a.href = "#"
			a.innerHTML += ' ';
			a.onclick = this._evt_keywordsOnclick.bind( this, k );
			this.elKeywords.appendChild( a );
		});
	},
	_evt_send( e ) {
		e && e.preventDefault();
		setHash( this.elInput.value );
		this._clearResult();
		samples.loadSamples.call(
			samples,
			document.getElementById( "result" ),
			window.db.getSamples( this.value ) );
		return false;
	},
	_evt_keywordsOnclick( query ) {
		this.elInput.value = query;
		this.elForm.onsubmit();
		return false;
	},
	_evt_autoComplete() {
		this.elKeywords.querySelectorAll( "a" )
			.forEach( k => {
				k.classList.toggle(
					"hide",
					!( this.elInput.value === "" ||
						k.innerHTML.includes( this.elInput.value.toLowerCase() ) )
				);
			});
	}
};