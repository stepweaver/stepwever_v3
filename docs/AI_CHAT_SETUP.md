# AI Chat Setup Guide

Your chat feature is now configured to use **Groq** (free tier) as the primary LLM provider, with OpenAI as a fallback.

## 🆓 Free Option: Groq (Recommended)

**Groq** offers a generous free tier with fast inference speeds. Perfect for personal portfolio sites!

### Setup Steps:

1. **Sign up for Groq** (free):
   - Go to https://console.groq.com/
   - Sign up with your email (free account)
   - Navigate to API Keys section

2. **Get your API key**:
   - Click "Create API Key"
   - Copy the key (starts with `gsk_...`)

3. **Add to your environment variables**:
   ```bash
   # In your .env.local file
   GROQ_API_KEY=gsk_your_key_here
   ```

4. **That's it!** The chat will now use Groq's free tier.

### Groq Free Tier Limits:
- **30 requests per minute**
- **Generous daily limits** (varies, but typically enough for personal sites)
- **Very fast responses** (often < 1 second)
- **Models available**: Llama 3.1 70B, Mixtral, and more

---

## 💰 Fallback Option: OpenAI

If you prefer OpenAI or Groq isn't available:

1. **Get OpenAI API key**:
   - Go to https://platform.openai.com/api-keys
   - Create a new API key

2. **Add to environment variables**:
   ```bash
   # In your .env.local file
   OPENAI_API_KEY=sk-your_key_here
   ```

3. The chat will automatically use OpenAI if Groq isn't configured.

**Note**: OpenAI's free tier is very limited ($5 credit). After that, you pay per request.

---

## 🔄 How It Works

The API route (`app/api/chat/route.js`) tries providers in this order:

1. **Groq** (if `GROQ_API_KEY` is set) ← **FREE**
2. **OpenAI** (if `OPENAI_API_KEY` is set) ← Paid after free credit

If neither is configured, users will see a friendly error message.

---

## 🧪 Testing

After setting up your API key:

1. Restart your dev server (`npm run dev`)
2. Navigate to `/terminal` page
3. Type: `chat What's your tech stack?`
4. You should get a response!

---

## 📝 Updating the System Prompt

The AI's knowledge about you is defined in `app/api/chat/route.js` in the `SYSTEM_PROMPT` constant. Update it whenever your resume or experience changes.

---

## 🚀 Production Deployment

Make sure to add your API key to your hosting platform's environment variables:

- **Vercel**: Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Other**: Check your platform's docs

**Important**: Never commit API keys to git! Always use environment variables.

---

## 💡 Alternative Free Options

If you want even more control or different models:

1. **Hugging Face Inference API**: Free tier available
2. **Local models (Ollama)**: Completely free, runs on your machine
3. **Anthropic Claude**: Has free tier but limited

The current setup is optimized for Groq's free tier, which is the best balance of free, fast, and high-quality.
