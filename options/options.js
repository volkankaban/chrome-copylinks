"use strict";

const popupSuccessCheckbox = document.getElementById("popupSuccess");
const popupFailCheckbox = document.getElementById("popupFail");
const finalNewlineCheckbox = document.getElementById("finalNewline");

chrome.storage.sync.get({
	popupSuccess: null,
	popupFail: null,
	finalNewline: null
}, options => {
	popupSuccessCheckbox.checked = options.popupSuccess;
	popupFailCheckbox.checked = options.popupFail;
	finalNewlineCheckbox.checked = options.finalNewline;

	popupSuccessCheckbox.addEventListener("change", event => {
		chrome.storage.sync.set({
			popupSuccess: popupSuccessCheckbox.checked
		});
	});

	popupFailCheckbox.addEventListener("change", event => {
		chrome.storage.sync.set({
			popupFail: popupFailCheckbox.checked
		});
	});

	finalNewlineCheckbox.addEventListener("change", event => {
		chrome.storage.sync.set({
			finalNewline: finalNewlineCheckbox.checked
		});
	});
});
