def analyze_job(job):

    score = 0
    reasons = []

    text = (job.get("description", "") + " " + job.get("title", "")).lower()

    keywords = [
        "registration fee",
        "pay money",
        "investment",
        "earn instantly",
        "whatsapp",
        "telegram",
        "urgent hiring",
        "work from home",
        "no interview"
    ]

    for word in keywords:
        if word in text:
            score += 15
            reasons.append(f"Found: {word}")

    if score > 100:
        score = 100

    if score < 30:
        risk = "LOW"
    elif score < 70:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    if not reasons:
        reasons.append("No suspicious keywords found.")

    return {
        "score": score,
        "risk": risk,
        "reasons": reasons
    }