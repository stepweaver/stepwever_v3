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
      <div className='mb-8'>
        <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-text leading-tight mb-4'>
          <GlitchLambda className='text-terminal-text' />
          stepweaver vs. traditional agencies:
        </h3>
      </div>

      {/* Mobile Layout - Stacked Cards */}
      <div className='md:hidden space-y-6'>
        {comparisons.map((comparison, index) => (
          <div key={index} className='space-y-4'>
            {/* λstepweaver */}
            <div>
              <div className='flex items-center mb-2'>
                <GlitchLambda className='text-terminal-green font-ibm text-lg' />
                <h4 className='text-terminal-green font-ibm text-sm ml-1'>
                  stepweaver
                </h4>
              </div>
              <h5 className='text-terminal-green font-ibm text-sm mb-2'>
                {comparison.stepweaver.title}
              </h5>
              <p className='text-terminal-text font-ocr text-xs leading-relaxed'>
                {comparison.stepweaver.description}
              </p>
            </div>

            {/* Traditional Agency */}
            <div>
              <div className='flex items-center mb-2'>
                <h4 className='text-terminal-text font-ibm text-sm'>
                  Traditional Agency
                </h4>
              </div>
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
          <div className='grid grid-cols-2'>
            <div className='text-center'>
              <div className='flex items-center justify-center'>
                <GlitchLambda className='text-terminal-green font-ibm text-xl' />
                <h4 className='text-terminal-green font-ibm text-lg ml-1'>
                  stepweaver
                </h4>
              </div>
            </div>
            <div className='text-center'>
              <h4 className='text-terminal-text font-ibm text-lg'>
                Traditional Agency
              </h4>
            </div>
          </div>

          {comparisons.map((comparison, index) => (
            <div key={index} className='grid grid-cols-2 gap-8'>
              <div>
                <h5 className='text-terminal-green font-ibm text-base mb-2'>
                  {comparison.stepweaver.title}
                </h5>
                <p className='text-terminal-text font-ocr text-sm leading-relaxed'>
                  {comparison.stepweaver.description}
                </p>
              </div>
              <div>
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
