'use client';

import { forwardRef } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

const ComparisonSection = forwardRef((props, ref) => {
  const comparisons = [
    {
      stepweaver: {
        title: 'Direct, Founder-Led Attention',
        description:
          'Work directly with the person who builds your solution-no middle layers, no information lost in translation.',
      },
      traditional: {
        title: 'Account Managers & Handoffs',
        description:
          'Most work is delegated down the line. You rarely talk to the expert actually doing the work.',
      },
    },
    {
      stepweaver: {
        title: 'Agile, Rapid Iteration',
        description:
          'Lightweight, flexible process adapts fast-no waiting for status meetings or lengthy approvals. Get real progress, week by week.',
      },
      traditional: {
        title: 'Slow, Waterfall Process',
        description:
          'Long timelines, slow feedback loops, and rigid processes that drag out delivery.',
      },
    },
    {
      stepweaver: {
        title: 'Transparent, Fair Pricing',
        description:
          'Low overhead means more value for your budget-what you pay goes into building, not agency overhead.',
      },
      traditional: {
        title: 'High Overhead, Inflated Costs',
        description:
          "You're billed for layers of management, fancy offices, and admin-not just the work.",
      },
    },
    {
      stepweaver: {
        title: 'Hands-On Collaboration',
        description:
          'Ideas flow directly-review, iterate, and ship faster. Communication is human, not corporate.',
      },
      traditional: {
        title: 'Impersonal Communication',
        description:
          'Feedback gets filtered through managers, delaying fixes and adding friction.',
      },
    },
  ];

  return (
    <div ref={ref} className='w-full'>
      {/* Mobile Layout - Stacked Cards */}
      <div className='md:hidden space-y-6'>
        {/* ——— MOBILE header (≤ 767 px) ——— */}
        <div className='md:hidden flex items-center justify-center gap-3 mb-8'>
          <div className='flex items-center gap-1'>
            <GlitchLambda className='text-terminal-green text-lg' />
            <span className='font-ibm text-terminal-green text-base'>
              stepweaver
            </span>
          </div>

          {/* tiny divider */}
          <span className='font-ibm text-terminal-cyan/60 text-sm tracking-wider'>
            VS
          </span>

          <span className='font-ibm text-terminal-text text-base'>
            Traditional Agency
          </span>
        </div>

        {comparisons.map((comparison, index) => (
          <div
            key={index}
            className='space-y-4 rounded-lg border border-terminal-border/40 p-4'
          >
            {/* λstepweaver */}
            <div className='max-w-sm'>
              <h5 className='text-terminal-green font-ibm text-sm mb-2'>
                {comparison.stepweaver.title}
              </h5>
              <p className='text-terminal-text font-ocr text-xs leading-relaxed'>
                {comparison.stepweaver.description}
              </p>
            </div>

            {/* Traditional Agency */}
            <div>
              <h5 className='text-terminal-text font-ibm text-sm mb-2'>
                {comparison.traditional.title}
              </h5>
              <p className='text-terminal-text font-ocr text-xs leading-relaxed opacity-60'>
                {comparison.traditional.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout - Clean Table */}
      <div className='hidden md:block'>
        <div className='space-y-6'>
          {/* Desktop header row
               — clearer hierarchy
               — color-coded underline so the eye locks on each column
               — keeps the λ mark tight to the brand name without pushing the grid */}
          <div className='hidden md:grid grid-cols-2 gap-8 mb-10'>
            {/* λstepweaver column label */}
            <div className='flex items-center justify-center gap-2 border-b-2 border-terminal-green/70 pb-2'>
              <GlitchLambda className='text-terminal-green text-2xl' />
              <h4 className='font-ibm text-terminal-green text-xl uppercase tracking-wide'>
                stepweaver
              </h4>
            </div>

            {/* Traditional Agency column label */}
            <div className='flex items-center justify-center border-b border-terminal-border/70 pb-2'>
              <h4 className='font-ibm text-terminal-text text-xl uppercase tracking-wide'>
                Traditional&nbsp;Agency
              </h4>
            </div>
          </div>

          {comparisons.map((comparison, index) => (
            <div key={index} className='grid grid-cols-2 gap-8'>
              <div className='max-w-lg'>
                <h5 className='text-terminal-green font-ibm text-base mb-2'>
                  {comparison.stepweaver.title}
                </h5>
                <p className='text-terminal-text font-ocr text-sm leading-relaxed'>
                  {comparison.stepweaver.description}
                </p>
              </div>
              <div className='max-w-lg'>
                <h5 className='text-terminal-text font-ibm text-base mb-2'>
                  {comparison.traditional.title}
                </h5>
                <p className='text-terminal-text font-ocr text-sm leading-relaxed opacity-60'>
                  {comparison.traditional.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ComparisonSection.displayName = 'ComparisonSection';

export default ComparisonSection;
