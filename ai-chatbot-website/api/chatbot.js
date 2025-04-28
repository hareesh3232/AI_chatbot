export default async function handler(req, res) {
    const apiKey = process.env.OPENAI_API_KEY; // Vercel Environment Variable

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    const userMessage = req.body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 100
        })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content.trim() });
}
