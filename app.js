async function generatePlan() {
  const goalBox = document.getElementById("goals");
  const selectedGoals = Array.from(goalBox.selectedOptions).map(o => o.value);

  const statusBox = document.getElementById("status");
  const resultBox = document.getElementById("result");

  // Reset UI
  statusBox.innerHTML = `
    <div class="thinking">
      🧠 CommitBuddy AI is thinking...
    </div>
  `;
  resultBox.innerHTML = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are CommitBuddy AI, a friendly nutrition and fitness coach."
          },
          {
            role: "user",
            content: `
Create a personalized nutrition and fitness plan.

Goals:
${selectedGoals.join(", ")}

Respond with:
- Daily nutrition tips
- Weekly fitness plan
- Motivation advice
`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    // SUCCESS UI
    statusBox.innerHTML = `
      <div class="success">
        ✅ Plan Generated Successfully!
      </div>
    `;

    resultBox.innerHTML = `
      <div class="ai-response">
        ${aiText.replace(/\n/g, "<br>")}
      </div>
    `;

  } catch (error) {
    statusBox.innerHTML = `
      <div class="error">
        ❌ AI failed. Please try again.
      </div>
    `;
    console.error(error);
  }
}
