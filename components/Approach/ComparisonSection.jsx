'use client';

import { forwardRef } from 'react';

const ComparisonSection = forwardRef((props, ref) => {
  const comparisons = [
    {
      stepweaver: {
        title: 'Direct, Founder-Led Attention',
        description:
          'Work directly with the person who builds your solution—no middle layers, no information lost in translation.',
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
          'Lightweight, flexible process adapts fast—no waiting for status meetings or lengthy approvals. Get real progress, week by week.',
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
          'Low overhead means more value for your budget—what you pay goes into building, not agency overhead.',
      },
      traditional: {
        title: 'High Overhead, Inflated Costs',
        description:
          "You're billed for layers of management, fancy offices, and admin—not just the work.",
      },
    },
    {
      stepweaver: {
        title: 'Hands-On Collaboration',
        description:
          'Ideas flow directly—review, iterate, and ship faster. Communication is human, not corporate.',
      },
      traditional: {
        title: 'Impersonal Communication',
        description:
          'Feedback gets filtered through managers, delaying fixes and adding friction.',
      },
    },
  ];

  return (
    <div ref={ref} className='w-full max-w-none'>
      <div className='bg-terminal-bg p-4 md:p-8'>
        {/* Mobile Layout - Stacked Cards */}
        <div className='md:hidden space-y-6'>
          {comparisons.map((comparison, index) => (
            <div key={index} className='space-y-4'>
              {/* λstepweaver Card */}
              <div className='border border-terminal-green/30 bg-terminal-dark/50 p-4 rounded-lg'>
                <div className='flex items-center mb-3'>
                  <span className='text-terminal-green font-ibm text-lg mr-2'>
                    λ
                  </span>
                  <h4 className='text-terminal-green font-ibm text-base'>
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

              {/* Traditional Agency Card */}
              <div className='border border-terminal-border/30 bg-terminal-dark/50 p-4 rounded-lg'>
                <div className='flex items-center mb-3'>
                  <span className='text-terminal-text font-ibm text-lg mr-2'>
                    ×
                  </span>
                  <h4 className='text-terminal-text font-ibm text-base'>
                    Traditional Agency
                  </h4>
                </div>
                <h5 className='text-terminal-text font-ibm text-sm mb-2'>
                  {comparison.traditional.title}
                </h5>
                <p className='text-terminal-text font-ocr text-xs leading-relaxed'>
                  {comparison.traditional.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Table */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b border-terminal-border'>
                <th className='text-center py-2 px-6 text-3xl font-ibm text-terminal-green w-1/2'>
                  λstepweaver
                </th>
                <th className='text-center py-2 px-6 text-3xl font-ibm text-terminal-text w-1/2'>
                  Traditional Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr key={index} className='border-b border-terminal-border'>
                  <td className='py-4 px-6 align-top text-center'>
                    <div>
                      <h4 className='text-lg font-ibm text-terminal-green mb-2'>
                        {comparison.stepweaver.title}
                      </h4>
                      <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                        {comparison.stepweaver.description}
                      </p>
                    </div>
                  </td>
                  <td className='py-4 px-6 align-top text-center'>
                    <div>
                      <h4 className='text-lg font-ibm text-terminal-text mb-2'>
                        {comparison.traditional.title}
                      </h4>
                      <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                        {comparison.traditional.description}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

ComparisonSection.displayName = 'ComparisonSection';

export default ComparisonSection;
