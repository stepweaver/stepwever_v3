import { Metadata } from 'next';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for stepweaver.dev',
};

export default function PrivacyPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16'>
      <h1 className='text-4xl md:text-5xl font-ibm text-terminal-green mb-8'>
        Privacy Policy
      </h1>

      <div className='prose prose-invert max-w-none space-y-6 font-ocr text-terminal-text leading-relaxed'>
        <p className='text-sm text-terminal-muted'>
          Last updated: February 5, 2025
        </p>

        <section>
          <h2 className='text-2xl font-ibm text-terminal-green mt-8 mb-4'>
            AI Chat Widget
          </h2>
          <p>
            This website includes an AI chat widget powered by Groq API. When
            you interact with the chat widget:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-4 mt-4'>
            <li>
              Your messages are sent to Groq API for processing to generate
              responses
            </li>
            <li>
              Conversations are <strong>not stored</strong> on this website's
              servers
            </li>
            <li>
              Messages are temporarily processed in memory for rate limiting
              purposes (IP address and user agent)
            </li>
            <li>
              Groq may process your data according to their{' '}
              <a
                href='https://groq.com/privacy-policy'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-green hover:text-terminal-cyan underline'
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href='https://console.groq.com/docs/legal/services-agreement'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-green hover:text-terminal-cyan underline'
              >
                Services Agreement
              </a>
            </li>
          </ul>
          <p className='mt-4'>
            If you have concerns about data privacy, please contact me directly
            at{' '}
            <a
              href='/contact'
              className='text-terminal-green hover:text-terminal-cyan underline'
            >
              stephen@stepweaver.dev
            </a>{' '}
            instead of using the chat widget.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-ibm text-terminal-green mt-8 mb-4'>
            Website Analytics
          </h2>
          <p>
            This website may use analytics services to understand visitor
            behavior. Analytics data is collected anonymously and does not
            include personal information from chat conversations.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-ibm text-terminal-green mt-8 mb-4'>
            Contact Forms
          </h2>
          <p>
            If you submit information through contact forms on this website, that
            information is sent directly to me via email and is not stored on
            the website's servers.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-ibm text-terminal-green mt-8 mb-4'>
            Your Rights
          </h2>
          <p>
            You have the right to request information about data collection and
            request deletion of any personal data. To exercise these rights,
            please contact me at{' '}
            <a
              href='/contact'
              className='text-terminal-green hover:text-terminal-cyan underline'
            >
              stephen@stepweaver.dev
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-ibm text-terminal-green mt-8 mb-4'>
            Changes to This Policy
          </h2>
          <p>
            I may update this privacy policy from time to time. The "Last
            updated" date at the top indicates when changes were made.
          </p>
        </section>

        <section className='mt-12 pt-8 border-t border-terminal-border'>
          <p className='text-sm text-terminal-muted'>
            If you have questions about this privacy policy, please{' '}
            <a
              href='/contact'
              className='text-terminal-green hover:text-terminal-cyan underline'
            >
              contact me
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
