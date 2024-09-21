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
    "onetrust"
    // Add more keywords as needed
  ];
}

function getAllElements(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("body :not(script) *")
  );
}

function elementHasButtons(element: HTMLElement): boolean {
  // Select all buttons or button-like elements within the element
  const buttons = element.querySelectorAll(
    'button, input[type="button"], input[type="submit"], a[role="button"], [role="button"]'
  );

  // Return true if there is at least one button-like element, otherwise false
  return buttons.length > 0;
}

function isElementVisible(element: HTMLElement): boolean {
  return element.offsetParent !== null;
}

function filterElements(
  elements: HTMLElement[],
  condition: (element: HTMLElement) => boolean
): HTMLElement[] {
  let newArray: HTMLElement[] = [];

  for (const element of elements) {
    if (condition(element)) {
      newArray.push(element);
    }
  }

  return newArray;
}

function getElementContent(element: HTMLElement): string {
  let content = "";

  // Get text content
  if (element.textContent) {
    content += element.textContent + " ";
  }

  // Get attribute values
  for (const attr of Array.from(element.attributes)) {
    content += attr.value + " ";
  }

  return content.toLowerCase();
}

function calculateElementScore(
  element: HTMLElement,
  keywords: string[]
): number {
  let score = 0;

  // Get element's content
  const content = getElementContent(element);

  // Count keyword occurrences
  for (const keyword of keywords) {
    const regex = new RegExp(keyword.toLowerCase(), "g");
    const matches = content.match(regex);
    if (matches) {
      score += matches.length;
    }
  }

  return score;
}

function calculateTotalScore(element: HTMLElement, keywords: string[]): number {
  let totalScore = calculateElementScore(element, keywords);

  // Recursively calculate score for children
  for (const child of Array.from(element.children) as HTMLElement[]) {
    totalScore += calculateTotalScore(child, keywords);
  }

  return totalScore;
}

function findElementWithHighestScore(
  elements: HTMLElement[],
  keywords: string[]
): HTMLElement | null {
  let maxScore = 0;
  let bestElement: HTMLElement | null = null;

  for (const element of elements) {
    let parentScore = calculateElementScore(element, keywords);
    if (parentScore > 0) {
      const score = calculateTotalScore(element, keywords);
      if (score > maxScore) {
        maxScore = score;
        bestElement = element;
      }
    }
  }

  return bestElement;
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
