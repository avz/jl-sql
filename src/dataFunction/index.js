'use strict';

const createDescription = (ctor) => {
	return {
		ctor: ctor,
		inputType: ctor.inputType,
		outputType: ctor.outputType
	};
};

module.exports = {
	read: {
		DUAL: createDescription(require('./read/DUAL')),
		STDIN: createDescription(require('./read/STDIN')),
		FILE: createDescription(require('./read/FILE'))
	},
	transform: {
		JSON: createDescription(require('./transform/JSON')),
		CSV: createDescription(require('./transform/CSV'))
	}
};
