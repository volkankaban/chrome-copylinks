"use strict";

// https://github.com/mdn/webextensions-examples/blob/master/context-menu-copy-link-with-types/clipboard-helper.js
const copyToClipboard = text => {
    const onCopy = event => {
		document.removeEventListener("copy", onCopy, true);
        event.stopImmediatePropagation();
		event.preventDefault();
        event.clipboardData.setData("text/plain", text);
	};

    document.addEventListener("copy", onCopy, true);
    document.execCommand("copy");
};

const getLinksInSelection = () => {
	const selection = getSelection();
	return Array.from(document.links).filter(link => selection.containsNode(link, true));
};

const unique = () => {
	const set = [];

	return x => {
		const notYetPresent = set.indexOf(x) === -1;

		if (notYetPresent) {
			set.push(x);
		}

		return notYetPresent;
	};
};

const onCopyRequested = (msg, sendResponse) => {
	const foundLinks = getLinksInSelection()
		//.map(link => link.href + "\t" + link.innerText.trim() )
		.map(link => link.href)
		.filter(unique());

	if (foundLinks.length > 0) {
		chrome.storage.sync.get({
			finalNewline: null
		}, options => {
			const newline = msg.isWindows? "\r\n": "\n";
			const joined = foundLinks.join(newline);

			copyToClipboard(options.finalNewline? joined + newline: joined);
		});
	}

	sendResponse({
		linksCopied: foundLinks.length
	});
};

const onMessageReceived = (msg, sender, sendResponse) => {
	switch (msg.subject) {
		case "copyRequested":
			onCopyRequested(msg, sendResponse);
			break;
		default:
			throw new Error("unknown message subject: " + msg.subject);
	}
};

chrome.runtime.onMessage.addListener(onMessageReceived);
