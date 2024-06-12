const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
const baseUrl = `https://api.telegram.org/bot${botToken}`;

export const sendMessage = async (message: string): Promise<void> => {
    const url: string = `${baseUrl}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            parse_mode: "html",
            text: message
        })
    });
    
    console.log('response', response);
}
