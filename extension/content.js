chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request.action==="extractJob"){

        const title =
            document.querySelector("h1")?.innerText || "";

        const company =
            document.querySelector(".topcard__org-name-link, .job-details-jobs-unified-top-card__company-name, .company")?.innerText || "";

        const description =
            document.body.innerText;

        sendResponse({
            title,
            company,
            description,
            url:window.location.href
        });
    }

    return true;

});