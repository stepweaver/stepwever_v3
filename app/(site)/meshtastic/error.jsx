'use client';

import { AlertTriangle } from 'lucide-react';

export default function MeshtasticError({ error, reset }) {
  return (
    <div className='min-h-[60vh] flex items-center justify-center px-4'>
      <div className='max-w-md w-full rounded-sm overflow-hidden border border-danger/20 bg-panel/20'>
        <div className='bg-panel/50 border-b border-danger/20 px-5 py-2.5 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='w-3 h-3 text-danger/60' />
            <span className='font-ocr text-[10px] tracking-[0.18em] text-danger/60 uppercase'>
              System error
            </span>
          </div>
          <span className='font-ocr text-[10px] text-text/20'>ERR-MESH</span>
        </div>
        <div className='p-6 text-center'>
          <p className='text-danger font-semibold text-lg mb-2 font-ibm'>
            Something went wrong
          </p>
          <p className='text-text/60 text-sm mb-6 font-ocr'>
            {error?.message ||
              'Could not load the Meshtastic docs. The data source may be temporarily unavailable.'}
          </p>
          <button
            onClick={() => reset()}
            className='inline-flex items-center gap-2 px-5 py-2 rounded-sm border border-neon/25 bg-panel/30 text-neon hover:bg-neon/10 hover:border-neon/40 transition-colors text-sm font-ocr'
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
