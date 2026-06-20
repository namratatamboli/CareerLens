document.getElementById("analyzeBtn").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.tabs.sendMessage(tab.id, {action: "extractJob"}, async (jobData) => {

        if (!jobData) {
            document.getElementById("result").innerText = "No job data found.";
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(jobData)
        });

        const data = await response.json();

        document.getElementById("result").innerText =
`Fraud Score : ${data.score}
Risk : ${data.risk}
Reasons :
${data.reasons.join("\n")}`;
    });

});