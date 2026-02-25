export default function MeshtasticDocLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='hud-panel p-8 sm:p-10 max-w-md w-full space-y-5 motion-safe:animate-[hudFadeIn_0.3s_ease-out]'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-[10px] tracking-[0.3em] text-neon/50 font-ocr uppercase'>
              MODULE
            </p>
            <p className='text-sm tracking-[0.18em] text-neon/80 font-ocr uppercase mt-0.5'>
              MESH_NET // DOC
            </p>
          </div>
          <div className='text-right'>
            <p className='text-[10px] tracking-[0.22em] text-neon/50 font-ocr uppercase'>
              STATUS
            </p>
            <p className='text-xs font-mono text-terminal-yellow mt-0.5'>
              STANDBY
            </p>
          </div>
        </div>

        <div className='font-mono text-xs space-y-1.5 text-neon/60'>
          <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.2s_both]'>
            <span className='text-neon/40'>{'>'}</span> establishing mesh
            link&hellip;
          </p>
          <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.6s_both]'>
            <span className='text-neon/40'>{'>'}</span> retrieving doc
            payload
          </p>
          <p className='text-neon/30 motion-safe:animate-[hudLineIn_0.3s_ease-out_1.0s_both]'>
            <span className='text-neon/40'>{'>'}</span> awaiting packet
            reassembly
            <span className='terminal-caret ml-0.5 text-terminal-green'>
              &#9608;
            </span>
          </p>
        </div>

        <div className='space-y-1.5 motion-safe:animate-[hudFadeIn_0.4s_ease-out_1.3s_both]'>
          <div className='relative h-[2px] w-full bg-neon/10 overflow-hidden rounded-full'>
            <div className='absolute inset-y-0 left-0 w-1/3 bg-terminal-green rounded-full motion-safe:animate-[hudSlide_1.2s_ease-in-out_infinite]' />
          </div>
          <p className='text-[10px] tracking-[0.18em] text-neon/40 font-ocr uppercase text-right'>
            RF_SYNC IN PROGRESS
          </p>
        </div>
      </div>
    </div>
  );
}
