'use client';

import { forwardRef } from 'react';

const ComparisonSection = forwardRef((props, ref) => {
  return (
    <div ref={ref} className='w-full max-w-none'>
      <div className='bg-terminal-bg'>
        {/* Comparison Table */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b border-terminal-border'>
                <th className='text-center py-2 px-6 text-3xl font-ibm text-terminal-green font-bold w-1/2'>
                  λstepweaver
                </th>
                <th className='text-center py-2 px-6 text-3xl font-ibm text-terminal-text font-bold w-1/2'>
                  Traditional Agency
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-terminal-border'>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                      Direct, Founder-Led Attention
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Work directly with the person who builds your solution—no
                      middle layers, no information lost in translation.
                    </p>
                  </div>
                </td>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                      Account Managers & Handoffs
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Most work is delegated down the line. You rarely talk to
                      the expert actually doing the work.
                    </p>
                  </div>
                </td>
              </tr>

              <tr className='border-b border-terminal-border'>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                      Agile, Rapid Iteration
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Lightweight, flexible process adapts fast—no waiting for
                      status meetings or lengthy approvals. Get real progress,
                      week by week.
                    </p>
                  </div>
                </td>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                      Slow, Waterfall Process
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Long timelines, slow feedback loops, and rigid processes
                      that drag out delivery.
                    </p>
                  </div>
                </td>
              </tr>

              <tr className='border-b border-terminal-border'>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                      Transparent, Fair Pricing
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Low overhead means more value for your budget—what you pay
                      goes into building, not agency overhead.
                    </p>
                  </div>
                </td>
                <td className='py-4 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                      High Overhead, Inflated Costs
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      You're billed for layers of management, fancy offices, and
                      admin—not just the work.
                    </p>
                  </div>
                </td>
              </tr>

              <tr className='border-b border-terminal-border'>
                <td className='pt-4 pb-2 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                      Hands-On Collaboration
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Ideas flow directly—review, iterate, and ship faster.
                      Communication is human, not corporate.
                    </p>
                  </div>
                </td>
                <td className='pt-4 pb-2 px-6 align-top text-center'>
                  <div>
                    <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                      Impersonal Communication
                    </h4>
                    <p className='text-terminal-text font-ocr text-base leading-relaxed max-w-lg mx-auto'>
                      Feedback gets filtered through managers, delaying fixes
                      and adding friction.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

ComparisonSection.displayName = 'ComparisonSection';

export default ComparisonSection;
