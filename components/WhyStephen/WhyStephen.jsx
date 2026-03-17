'use client';

import { memo } from 'react';
import { HUDPanel } from '@/components/ui/HUDPanel';

function WhyStephen() {
  return (
    <section className='relative z-30 w-full'>
      <div className='hud-panel border border-neon/20 bg-panel/60'>
        <HUDPanel title='WHY STEPHEN' id='WHY-01' className='p-6'>
          <p className='font-ibm text-text text-base md:text-lg leading-relaxed'>
            I build practical systems for real operations. The through-line in my
            career has been translating messy, human problems into workflows that
            hold up under pressure.
          </p>
          <ul className='mt-4 space-y-2 text-sm md:text-base font-ocr text-text/80'>
            <li>8+ years bridging business and technical systems</li>
            <li>Comfortable in ambiguity, integration work, and constraint-heavy environments</li>
            <li>Focused on outcomes: reduce friction, improve operations, make the workflow usable</li>
          </ul>
        </HUDPanel>
      </div>
    </section>
  );
}

export default memo(WhyStephen);

