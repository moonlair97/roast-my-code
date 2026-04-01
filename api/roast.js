module.exports = async function handler(req, res) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not found. Value: ' + typeof process.env.ANTHROPIC_API_KEY });
  }

  const { code, lang, intensity } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const intensityPrompts = {
    mild: "Give friendly, slightly teasing feedback. Be constructive but throw in some gentle jokes. Like a senior dev who genuinely wants to help but can't resist a few light jabs.",
    medium: "Be honest and sarcastic. Don't pull punches, but don't be mean-spirited. Think witty code review from a developer with a sharp sense of humor.",
    savage: "Go full roast mode. Be brutally, hilariously critical. Exaggerate flaws for comedic effect. Channel your inner Gordon Ramsay but for code. Keep it funny, not cruel."
  };

  const systemPrompt = `You are a ruthless but hilarious code reviewer. ${intensityPrompts[intensity] || intensityPrompts.medium}
Format your response as 3-5 short paragraphs. Each paragraph targets a specific issue or observation.
Be specific — reference actual things in the code. No bullet points, just punchy prose paragraphs.
End with one "verdict" line that summarizes the overall quality with a grade from F to A+.
Keep the total response under 300 words.`;

  const langNote = lang ? `The language is ${lang}.` : 'Detect the language yourself.';
  const userPrompt = `${langNote}\n\nHere's the code:\n\n\`\`\`\n${code.substring(0, 3000)}\n\`\`\`\n\nRoast it.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const roast = data.content?.[0]?.text || 'No response received.';
    return res.status(200).json({ roast });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
