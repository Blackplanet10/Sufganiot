const COOKIE_FACTS = [
    "Those cookies would amount to about 12kg!",
    "This amount of cookies can feed 8 grown adults for a day.",
    "You've consumed enough cookies to fill a cookie jar for months!",
    "That many cookies could cover a small table!"
];

// Fetch the number of cookies from the text file
async function fetchCookieCount() {
    try {
        const response = await fetch('cookies.txt');
        if (!response.ok) throw new Error('Failed to fetch cookie count');
        const count = await response.text();
        return parseInt(count, 10);
    } catch (error) {
        console.error(error);
        return 0;
    }
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a realistic "pyramid" stack of cookies with base-first prioritization
function createCookieStack(count) {
    const stackContainer = document.getElementById('cookie-stack');
    stackContainer.innerHTML = ''; // Clear previous stack

    let totalRows = 0;
    let remainingCookies = count;

    // Determine the total number of rows that can fit the pyramid
    while (remainingCookies > totalRows) {
        totalRows++;
        remainingCookies -= totalRows;
    }

    // Reset remaining cookies to the total count for stacking
    remainingCookies = count;

    const rows = []; // Collect rows in reverse order (from base to top)

    // Build rows from base to top
    for (let row = totalRows; row > 0; row--) {
        const rowElement = document.createElement('div');
        rowElement.className = 'cookie-row';

        // Determine the number of cookies to place in the current row
        const cookiesInRow = Math.min(row, remainingCookies);
        for (let i = 0; i < cookiesInRow; i++) {
            const img = document.createElement('img');
            img.src = `sufganiot/donut${getRandomIntInRange(1, 7)}.png`; // Cycle through cookie images
            img.alt = 'Cookie';

            if (Math.random() > 0.5) {
                img.style.transform = 'scaleX(-1)';
            }

            rowElement.appendChild(img);


            // Add "falling into place" animation with delay
            setTimeout(() => {
                img.classList.add('loaded');
            }, 100 * (totalRows - row + i)); // Staggered delay for base-first animation
        }

        rows.push(rowElement); // Collect rows
        remainingCookies -= cookiesInRow; // Subtract cookies added to this row
    }

    // Append rows from top to bottom (last row in rows array is the top row)
    rows.reverse().forEach(row => stackContainer.appendChild(row));
}

// Display a random fact
function displayRandomFact() {
    const factElement = document.getElementById('cookie-fact');
    const randomFact = COOKIE_FACTS[Math.floor(Math.random() * COOKIE_FACTS.length)];
    factElement.textContent = randomFact;
}

// Main function to initialize the page
async function initializePage() {
    const count = await fetchCookieCount();
    const countElement = document.getElementById('cookie-count');
    countElement.textContent = count;

    createCookieStack(count);
    displayRandomFact();
}

// Initialize the page on load
window.onload = initializePage;
