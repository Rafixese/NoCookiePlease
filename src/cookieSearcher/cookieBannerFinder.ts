import {
	getAllElements,
	filterElements,
	findElementWithHighestScore,
	elementHasButtons,
	isElementVisible,
} from "../utils/dom";

function getKeywords(): string[] {
	return [
		"cookie",
		"cookie-banner",
		"cookie-consent",
		"cookie-notification",
		"cookie-dialog",
		"cookie-message",
		"cookie-policy",
		"cookie-container",
		"cookie-popup",
		"cookie-alert",
		"cookie-notice",
		"cookie-modal",
		"onetrust",
		// Add more keywords as needed
	];
}

function findCookieBanner(): HTMLElement | null {
	const keywords = getKeywords();
	let elements = getAllElements();
	elements = filterElements(elements, elementHasButtons);
	let visibleElements = filterElements(elements, isElementVisible);
	let cookieBanner = findElementWithHighestScore(visibleElements, keywords);
	// if(!cookieBanner) cookieBanner = findElementWithHighestScore(elements, keywords);
	return cookieBanner;
}

export { findCookieBanner };
