import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-terminal-dark flex items-center justify-center p-8'>
      <div className='text-center'>
        <div className='text-terminal-red text-6xl mb-4 font-ibm'>404</div>
        <h1 className='text-terminal-green text-2xl mb-4 font-ibm'>
          PAGE NOT FOUND
        </h1>
        <p className='text-terminal-text mb-8 font-ocr'>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href='/'
          className='bg-terminal-green text-terminal-dark font-ibm px-6 py-3 rounded border border-terminal-green hover:bg-terminal-green/80 transition-colors'
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
