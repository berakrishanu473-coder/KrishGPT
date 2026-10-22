import 'dotenv/config';

const getAIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
            "model": "nvidia/nemotron-3.5-super-vl:free",
            "messages": [
                {
                    "role": "user",
                    "content": message,
                }
            ],
            "reasoning": {"enabled": true}
        }),
    };

    try {
        const response =await fetch("https://openrouter.ai/api/v1/chat/completions", options);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "API request failed");
        }
        // console.log(data.choices[0].message.content);
        return (data.choices[0].message.content); // reply
    } catch (error) {
        console.log(error);
    }
};

export default getAIResponse;