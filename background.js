export { }

console.log(
    "Live now; make now always the most precious time. Now will never come again."
)

chrome.action.onClicked.addListener((tab) => {
    console.log(`ironman action clicked`)
    chrome.tabs.sendMessage(tab.id, {
        type: "unfollow",
    });
})