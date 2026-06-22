document.getElementById("analyzeBtn").addEventListener("click", async () => {

    const btn = document.getElementById("analyzeBtn");
    btn.innerHTML = "Analyzing...";
    btn.disabled = true;

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.tabs.sendMessage(tab.id, {
        action: "extractJob"
    }, async (jobData) => {

        if (!jobData) {
            btn.innerHTML = "Analyze";
            btn.disabled = false;
            return;
        }

        document.getElementById("jobTitle").textContent =
            jobData.title || "--";

        document.getElementById("company").textContent =
            jobData.company || "--";

        try{

            const url = new URL(jobData.url);

            document.getElementById("domain").textContent =
                url.hostname;

        }catch{

            document.getElementById("domain").textContent = "--";

        }

        try{

            const response = await fetch("http://127.0.0.1:5000/analyze",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(jobData)

            });

            const data = await response.json();

            document.getElementById("score").textContent = data.score;

            const ring = document.querySelector(".score-ring");

            ring.style.background =
                `conic-gradient(#2563eb ${data.score}%, #dbeafe ${data.score}% 100%)`;

            const badge = document.getElementById("riskBadge");

            badge.className = "badge";

            if(data.risk==="LOW")
                badge.classList.add("low");

            else if(data.risk==="MEDIUM")
                badge.classList.add("medium");

            else
                badge.classList.add("high");

            badge.textContent = data.risk + " RISK";

            const list = document.getElementById("reasonList");

            list.innerHTML = "";

            data.reasons.forEach(reason=>{

                list.innerHTML += `<li>${reason}</li>`;

            });

        }

        catch{

            document.getElementById("reasonList").innerHTML =
                "<li>Backend unavailable.</li>";

        }

        btn.innerHTML =
        `<span class="material-symbols-outlined">refresh</span>Analyze`;

        btn.disabled = false;

    });

});