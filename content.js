/**
 * Configuration for the content script
 * @type {Object}
 */
export const config = {
    matches: ["<all_urls>"],
    all_frames: true
};

let observer = null;

/**
 * Handles the found checkbox element
 * @param {HTMLInputElement} checkbox - The checkbox element
 */
function handleCheckboxFound(checkbox) {
    if (checkbox && checkbox.checked) {
        unfollowCompany(checkbox);
    }
}

/**
 * Unfollows the company by unchecking the checkbox
 * @param {HTMLInputElement} checkbox - The checkbox element
 */
function unfollowCompany(checkbox) {
    checkbox.checked = false;
    submitApplication();
}

/**
 * Submits the application
 */
function submitApplication() {
    const submitButton = document.querySelector(
        'button[aria-label="Submit application"][type="button"]'
    );

    if (submitButton) {
        submitButton.click();
    } else {
        console.warn('Submit button not found - application may not be submitted');
    }
}

/**
 * Cleans up resources
 */
function cleanup() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

/**
 * Initializes the observer for the follow company checkbox
 */
function initialize() {
    const observerConfig = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };

    observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                const checkbox = mutation.target.querySelector('#follow-company-checkbox');
                if (checkbox) {
                    handleCheckboxFound(checkbox);
                }
            }
        }
    });
    
    observer.observe(document.body, observerConfig);
    console.log("LinkedIn Unfollow observer initialized successfully");
}

// Initialize the application
initialize();

// Cleanup on page unload
window.addEventListener('unload', cleanup);
