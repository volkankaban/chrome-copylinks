"use strict";

chrome.storage.sync.get({
	popupSuccess: null,
	popupFail: null,
	finalNewline: null
}, options => {
	const overwrite = {};

	if (typeof(options.popupSuccess) !== "boolean") {
		overwrite.popupSuccess = false;
	}

	if (typeof(options.popupFail) !== "boolean") {
		overwrite.popupFail = true;
	}

	if (typeof(options.finalNewline) !== "boolean") {
		overwrite.finalNewline = true;
	}

	const keys = Object.keys(overwrite);
	if (keys.length > 0) {
		chrome.storage.sync.set(overwrite, () => {
			chrome.runtime.openOptionsPage();
			main();
		});
	} else {
		main();
	}
});
