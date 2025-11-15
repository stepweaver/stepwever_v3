const defaultProfile = {
  name: 'Nyx Solaris',
  role: 'XR Protocol Engineer',
  tagline: 'Lambda Systems · R&D',
  status: 'ACTIVE',
  avatar:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=220&h=220&auto=format&fit=crop&crop=faces',
  badges: ['Security Engineer', 'XR Specialist', 'Quantum Ops'],
};

const NeonProfileCard = ({ profile }) => {
  const mergedProfile = profile ?? defaultProfile;
  const tagline = mergedProfile.tagline ?? mergedProfile.department;
  const badges = Array.isArray(mergedProfile.badges)
    ? mergedProfile.badges
    : [];

  return (
    <div className='relative w-full max-w-[340px] text-terminal-text font-ocr'>
      <div className='relative overflow-hidden rounded-[24px] border border-terminal-green/30 bg-terminal-dark/85 backdrop-blur-xl card-glow'>
        <div className='absolute inset-0 opacity-25' aria-hidden='true'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,255,65,0.18),transparent_55%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(255,0,255,0.15),transparent_45%)]' />
        </div>

        <div className='relative p-6 space-y-6'>
          <div className='flex items-center justify-between'>
            <p className='font-ibm text-xl text-terminal-green tracking-[0.2em]'>
              Stepweaver
            </p>
            {mergedProfile.status && (
              <div className='flex items-center gap-2 text-terminal-green uppercase text-[0.6rem] tracking-[0.4em]'>
                <span className='relative flex h-3.5 w-3.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-50' />
                  <span className='relative inline-flex h-3.5 w-3.5 rounded-full bg-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.45)]' />
                </span>
                {mergedProfile.status}
              </div>
            )}
          </div>

          <div className='flex flex-col gap-4 items-start text-left'>
            {mergedProfile.avatar && (
              <div className='relative h-28 w-28 overflow-hidden rounded-3xl border border-terminal-magenta/40 shadow-[0_0_18px_rgba(255,0,255,0.2)]'>
                <img
                  src={mergedProfile.avatar}
                  alt={`${mergedProfile.name} avatar`}
                  loading='lazy'
                  className='h-full w-full object-cover'
                />
              </div>
            )}

            <div>
              <p className='font-ibm text-3xl text-terminal-green leading-tight'>
                {mergedProfile.name}
              </p>
              <p className='mt-1 text-sm uppercase tracking-[0.35em] text-terminal-magenta'>
                {mergedProfile.role}
              </p>
              {tagline && (
                <p className='mt-2 text-sm text-terminal-muted'>{tagline}</p>
              )}
            </div>
          </div>

          {badges.length > 0 && (
            <div className='rounded-2xl border border-terminal-border/50 bg-terminal-light/12 px-4 py-4 space-y-2 text-left'>
              {badges.map((badge, index) => {
                const badgeContent =
                  typeof badge === 'string' ? { text: badge } : badge;
                return (
                  <p
                    key={`${badgeContent.text}-${index}`}
                    className={`font-ibm text-base tracking-wide ${
                      badgeContent.accent
                        ? 'italic text-terminal-magenta'
                        : 'text-terminal-text'
                    }`}
                  >
                    {badgeContent.text}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeonProfileCard;
