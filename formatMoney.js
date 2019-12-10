document.addEventListener("DOMContentLoaded", function() {

	function formatMoney(rawNumber, fractionDigits, decimalSign, thousandsSeparator) {

		// If the number parameter is omitted, it returns an error message and returns false.
		if ( typeof (rawNumber) === "undefined" ) {
			console.error("formatToMoney Function -> A number must be given as the first parameter of the formatToMoney function.");
			return false;
		}
		// decimalSign and thousandsSeparator cannot be the same value.
		if(decimalSign == thousandsSeparator) {
			console.error("formatToMoney Function -> DecimalSign and ThousandsSeparator cannot be the same value.");
			return false;
		}
		
		// declare variables.
		var intPartStr, decPartStr, intPartNum, decPartNum, rawNumberStr, neg, firstSirstSeparatorIndex;

		// default value of fraction digits = 2
		fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;

		// default value of decimal sign = ","
		decimalSign = typeof (decimalSign) === "undefined" ? "," : decimalSign;

		// default value of thousands separator = "."
		thousandsSeparator = typeof (thousandsSeparator) === "undefined" ? "." : thousandsSeparator;

		// maybe another type
		rawNumberStr = rawNumber.toString();

		// purify the number from thousandsSeparators. RegExp much slower than string search.
		if(rawNumberStr.search(thousandsSeparator) != -1) {
			rawNumberStr = rawNumberStr.split(thousandsSeparator).join("");
		}

		// take digit and fraction of the number
		if(rawNumberStr.search(decimalSign) != -1) {
			if (rawNumberStr.substr(-1) == decimalSign) {
				intPartStr = rawNumberStr;
				decPartStr = "0".repeat(fractionDigits);
			} else {
				rawNumberStr_splitted = rawNumberStr.split(decimalSign);
				intPartStr = rawNumberStr_splitted[0];
				decPartStr = rawNumberStr_splitted[1];
			}
		} else {
			intPartStr = rawNumberStr;
			decPartStr = "0".repeat(fractionDigits);
		}

		intPartNum = parseInt(intPartStr);


		// number -> positive or negative.
		neg = intPartNum < 0 ? "-" : "";

		intPartNum = Math.abs(intPartNum);

		intPartStr = intPartNum.toString();

		// an interesting rounding attempt :)
		decPartStr = ( (decPartStr.length > fractionDigits) && (parseInt( decPartStr.substr(fractionDigits, 1) ) >= 5) ) ? decPartStr.substr(0, fractionDigits - 1) + (parseInt( decPartStr.substr(fractionDigits - 1, 1) ) + 1).toString() : decPartStr;


		// Thousands Separator first index.
		firstSeparatorIndex = (firstSeparatorIndex = intPartStr.length) > 3 ? firstSeparatorIndex % 3 : 0;

		// RETURN
		return neg +

		(firstSeparatorIndex ? intPartStr.substr(0, firstSeparatorIndex) + thousandsSeparator : "") +

		intPartStr.substr(firstSeparatorIndex).replace(/(\d{3})(?=\d)/g, "$1" + thousandsSeparator) +

		( (fractionDigits) ? decimalSign + decPartStr.substr(0, fractionDigits) : "");

	}

});
