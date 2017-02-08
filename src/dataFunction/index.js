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
		DUAL: createDescription(require('./read/DUAL'))
	}
};
