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
    } else {
        console.error("Checkbox element not found!");
    }
}

function submitApplication() {
    // Select the button using its aria-label attribute
    const submitButton = document.querySelector('button[aria-label="Submit application"]');

    // Check if the button exists before clicking it
    if (submitButton) {
        submitButton.click();
    } else {
        console.error('Submit button not found');
    }
}