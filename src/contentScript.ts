import { findCookieBanner } from "./cookieSearcher/cookieBannerFinder";

console.log("NOCOOKIEPLEASE is running!");

const observer = new MutationObserver(() => {
	handleCookieBanner();
});

observer.observe(document.body, { childList: true, subtree: true });

function handleCookieBanner() {
	const cookieBanner = findCookieBanner();
	if (cookieBanner) {
		console.log("Cookie banner found:", cookieBanner);
		// observer.disconnect();
	} else {
		console.log("No cookie banner found.");
	}
}
