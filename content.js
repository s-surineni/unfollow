export const config = {
    matches: ["<all_urls>"],
    all_frames: true
}

chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("ironman  Received message:", msg.type);
    switch (msg.type) {
        case "unfollow": {
            unFollowCompany();
            submitApplication();
            break;
        }
    }
});


function unFollowCompany() {
    // Get the checkbox element using its id
    const checkbox = document.getElementById("follow-company-checkbox");

    // Check if the checkbox exists
    if (checkbox) {
        // To select (check) the checkbox
        checkbox.checked = true;

        // To unselect (uncheck) the checkbox
        checkbox.checked = false;
        displayFeedback("Unfollowed company successfully (if applicable)!");
    } else {
        console.error("Follow company checkbox element not found! " +
            "Tried to find element with ID: 'follow-company-checkbox'. " +
            "The ID might have changed, or the element might not be present on the page.");
        displayFeedback("Could not unfollow company: element not found!");
    }
}

function submitApplication() {
    // Select the button using more robust selectors
    const submitButton = document.querySelector(
        'button[aria-label="Submit application"][type="submit"],' + // Original selector with type
        'button[aria-label="Submit application"],' +             // Original selector
        'button[type="submit"]:contains("Submit"),' +          // Button with type="submit" containing "Submit"
        'button:contains("Submit application"),' +                 // Button containing "Submit application"
        'button:contains("Apply")'                              // Button containing "Apply"
    );

    // Check if the button exists before clicking it
    if (submitButton) {
        submitButton.click();
        displayFeedback("Application submitted successfully!");
    } else {
        console.error("Submit application button not found! " +
            "Tried selectors: " +
            '"button[aria-label=\\"Submit application\\"][type=\\"submit\\"], button[aria-label=\\"Submit application\\"], button[type=\\"submit\\"]:contains(\\"Submit\\"), button:contains(\\"Submit application\\"), button:contains(\\"Apply\\")". ' +
            "The attributes or text content of the button might have changed.");
        displayFeedback("Could not submit application: button not found!");
    }
}

/**
 * Displays a temporary feedback message to the user.
 * @param {string} message The message to display.
 */
function displayFeedback(message) {
    // Creates a div element for the feedback message.
    const feedbackDiv = document.createElement("div");
    feedbackDiv.textContent = message;
    feedbackDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    // Adds the feedback div to the document body.
    document.body.appendChild(feedbackDiv);
    // Removes the feedback div after 3 seconds.
    setTimeout(() => {
        feedbackDiv.remove();
    }, 3000);
}