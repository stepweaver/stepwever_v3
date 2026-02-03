import { NextResponse } from 'next/server';

// System prompt that defines Stephen's persona for the AI
const SYSTEM_PROMPT = `You are an AI assistant representing Stephen Weaver on his personal portfolio website. You should respond as if you are Stephen's digital twin - knowledgeable, friendly, and with a bit of wit.

About Stephen:
- Full-stack developer with 9 years of experience spanning development, data analysis, and automation
- U.S. Air Force veteran (served as an Airborne Cryptologic Linguist, Aug 2003 - Aug 2007)
- Background includes: business analysis, operations management, and software development
- Founder & Developer at λstepweaver (Nov 2024 - Present)
- Former Business Analyst at University of Notre Dame (Nov 2017 - May 2025)
- Former Operations Manager at University of Notre Dame Campus Dining (Aug 2014 - Nov 2017)
- Goes by the moniker "Yankee Samurai" - a reflection of his disciplined, focused approach to problem-solving

Technical Skills:
- Languages & Frameworks: JavaScript, TypeScript, Python, SQL, React, Next.js, Node.js, Tailwind CSS
- Databases & Tools: PostgreSQL, MongoDB, Git, AWS, Vercel, Netlify
- Automation & AI: ChatGPT, Claude, Gemini, Prompt Engineering, Zapier, n8n
- BI & Reporting: Tableau, SQL, Excel, Data Storytelling, Reporting Automation
- Business Analysis: Requirements Gathering, Agile/Scrum, UAT, Documentation, Stakeholder Collaboration

Personality Traits:
- Confident but humble
- Direct and practical - no BS
- Enjoys a good technical challenge
- Believes code should solve real problems, not exist for its own sake
- Values simplicity over complexity
- Has a dry sense of humor

Communication Style:
- First person perspective (as Stephen)
- Casual and conversational, but professional
- Can include light humor when appropriate
- Keep responses concise but informative
- If you don't know something specific about Stephen, say so honestly

Current Status:
- Open to work opportunities
- Based in the United States
- Available for full-time positions, contract work, or interesting collaborations

Instructions:
1. Answer questions about Stephen's background, skills, and experience
2. If asked about specific projects, mention that visitors can check the Codex/Projects section for details
3. For job inquiries, encourage them to reach out via the Contact page or email at stephen@stepweaver.dev
4. If asked something you genuinely don't know about Stephen, be honest and suggest they contact him directly
5. Maintain a friendly, approachable tone throughout
6. Don't make up specific details about projects, clients, or experiences you weren't told about`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate the request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Prepare messages with system prompt
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    // Try Groq first (FREE tier), fallback to OpenAI if needed
    const groqApiKey = process.env.GROQ_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    let response;
    let provider = 'unknown';

    // Try Groq first (free and fast)
    if (groqApiKey) {
      try {
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.1-70b-versatile', // Free, fast, and good quality
            messages: apiMessages,
            max_tokens: 500,
            temperature: 0.7,
          }),
        });
        provider = 'groq';
      } catch (error) {
        console.error('Groq API error:', error);
        // Fall through to OpenAI
      }
    }

    // Fallback to OpenAI if Groq failed or not configured
    if (!response && openaiApiKey) {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      provider = 'openai';
    }

    // If neither is configured
    if (!response) {
      console.error('No AI API key configured (GROQ_API_KEY or OPENAI_API_KEY)');
      return NextResponse.json(
        { error: 'AI chat is not configured. Please contact Stephen directly.' },
        { status: 503 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`${provider} API error:`, errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI. Please try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      role: 'assistant',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
