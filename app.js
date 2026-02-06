async function generatePlan() {
  const chatBox = document.getElementById("chatBox");
  const success = document.getElementById("result");

  success.classList.remove("hidden");
  chatBox.classList.remove("hidden");
  chatBox.innerText = "🧠 CommitBuddy AI is thinking...";

  // Collect user data
  const age = document.querySelector('input[type="number"]').value;
  const gender = document.querySelector("select").value;
  const height = document.querySelectorAll("input")[1].value;
  const weight = document.querySelectorAll("input")[2].value;

  const goals = Array.from(
    document.querySelectorAll("select")[1].selectedOptions
  ).map(o => o.value).join(", ");

  const prompt = `
User details:
Age: ${age}
Gender: ${gender}
Height: ${height}
Weight: ${weight}
Activity Level: ${activity}
Goals: ${goals.join(", ")}

Create a personalized plan including:
1. Daily calorie target
2. Macronutrient split
3. Workout suggestions
4. Meal ideas
5. Motivation tips

Make it realistic and beginner-friendly.
`;


  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 300 }
        })
      }
    );

    const data = await response.json();

    chatBox.innerText = data[0].generated_text;

  } catch (error) {
    chatBox.innerText = "❌ AI failed. Please try again.";
  }
}
