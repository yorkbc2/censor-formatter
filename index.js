(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CensoreFormatter = factory());
}(this, (function () { 

	'use strict';

	var startedDictionary = require('./data/dictionary.json');


	var CensoreFormatter = {

		dictionary: function () {
			return this.x_Dictionary.concat(this.userDictionary)
		},

		x_Dictionary: startedDictionary.words,
		userDictionary: [],

		addWords: function (words) {

			if(typeof words !== 'object') {
				throw new Error('Argument in addWord method must be an array');
			}
			else {

				this.userDictionary = this.userDictionary.concat(words);

				return this;

			}

		},

		format: function (stringToFormat, flagDep) {

			let text = this.formattingText(stringToFormat, flagDep);

			return text;

		},

		formattingText: function (stringToFormat, flagDep) {

			let regular = this.regularForFormating(flagDep),
				returnedString = '';

			returnedString = stringToFormat.replace(regular, function (found) {

				let formattedFoundString = '',
					firstChar = '',
					lastChar = '',
					stringLength = 0,
					stars__ = '';

				firstChar = found.charAt(0);
				lastChar = found.charAt(found.length - 1);

				stringLength = found.length;

				for(let j = 0 ; j < stringLength - 2 ; j++) {
					stars__ += "*";
				}

				formattedFoundString = firstChar + stars__ + lastChar;

				return formattedFoundString;
			});

			return returnedString;

		},

		regularForFormating: function (caseDep) {
			let regular = '',
				flags = 'gi';

			for(let i = 0 ; i < this.dictionary().length ; i++) {

				let item = this.dictionary()[i];

				regular += '(' + item + ')';
				if(i !== this.dictionary().length - 1) {
					regular += '|';
				}

			}

			if(caseDep) {
				if(caseDep == true) {
					flags = 'gi';
				}
				else {
					flags = 'g';
				}
			}

			regular = new RegExp(regular, 'gi');

			return regular;


		}

	};



	return CensoreFormatter
})));