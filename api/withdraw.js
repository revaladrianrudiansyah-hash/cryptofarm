export default async function handler(req, res) {
    // Hanya izinkan metode POST (untuk keamanan)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId, amount, email } = req.body;

    // --- PENTING: GANTI DENGAN API KEY KAMU ---
    const FAUCETPAY_API_KEY = "PASTE_API_KEY_KAMU_DISINI"; 
    const CURRENCY = "DOGE"; 

    try {
        // Proses pengiriman ke API FaucetPay
        const response = await fetch("https://faucetpay.io/api/v1/send", {
            method: "POST",
            body: new URLSearchParams({
                api_key: FAUCETPAY_API_KEY,
                amount: amount, // Jumlah satoshi atau coin
                to: email,      // Email FaucetPay user
                currency: CURRENCY,
                referral: "no"
            })
        });

        const data = await response.json();

        if (data.status === 200) {
            return res.status(200).json({ success: true, message: 'Withdrawal Successful!' });
        } else {
            return res.status(400).json({ success: false, message: data.message });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}
