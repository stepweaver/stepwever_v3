'use client';

export default function Approach() {
  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Content Container - Right Justified and Wider */}
        <div className='max-w-6xl ml-auto'>
          {/* Main heading - Positioned above content */}
          <h2 className='text-4xl md:text-5xl lg:text-6xl mb-16 leading-tight text-left font-ibm text-terminal-green font-bold whitespace-nowrap'>
            APPROACH
          </h2>
          {/* Main Headline */}
          <h3 className='text-3xl md:text-4xl lg:text-5xl font-ibm text-terminal-text leading-tight mb-8'>
            It's all about moving fast, staying clear, and building the right
            thing—together.
          </h3>

          {/* Main Description */}
          <div className='mb-8'>
            <p className='text-terminal-text font-ocr text-lg leading-relaxed'>
              At λstepweaver, every project is a collaboration—rooted in rapid
              prototyping, honest feedback, and the discipline of
              follow-through. Instead of endless meetings and vague milestones,
              we break complex challenges into focused sprints, each with
              concrete deliverables and a built-in feedback loop.
            </p>
          </div>

          {/* Our Approach Section */}
          <div className='mb-8'>
            <h4 className='text-2xl md:text-3xl font-ibm text-terminal-cyan mb-6 font-bold'>
              Our approach is simple:
            </h4>

            {/* Approach Steps */}
            <div className='space-y-6'>
              <div className='border-l-4 border-terminal-green pl-4'>
                <h5 className='text-xl font-ibm text-terminal-green font-bold mb-1'>
                  Align on the goal.
                </h5>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  Every project starts with a shared vision and a clear
                  definition of success.
                </p>
              </div>

              <div className='border-l-4 border-terminal-green pl-4'>
                <h5 className='text-xl font-ibm text-terminal-green font-bold mb-1'>
                  Map the path.
                </h5>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  We outline stages, set priorities, and schedule regular
                  check-ins so you always know what's next.
                </p>
              </div>

              <div className='border-l-4 border-terminal-green pl-4'>
                <h5 className='text-xl font-ibm text-terminal-green font-bold mb-1'>
                  Build in the open.
                </h5>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  You see progress early and often—not just at the finish line.
                </p>
              </div>

              <div className='border-l-4 border-terminal-green pl-4'>
                <h5 className='text-xl font-ibm text-terminal-green font-bold mb-1'>
                  Iterate together.
                </h5>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  Client feedback isn't an afterthought; it's woven into every
                  stage, ensuring your input steers the outcome.
                </p>
              </div>

              <div className='border-l-4 border-terminal-green pl-4'>
                <h5 className='text-xl font-ibm text-terminal-green font-bold mb-1'>
                  Deliver with pride.
                </h5>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  Every deliverable ships with clarity, polish, and a support
                  window to make sure everything lands right.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className='border-t border-terminal-border pt-6 mb-16'>
            <p className='text-terminal-text font-ocr text-lg leading-relaxed'>
              No black boxes. No disappearing acts. Just a transparent process
              and responsive communication—from kickoff to launch (and beyond).
              That's how λstepweaver turns "someday" projects into shipping
              realities.
            </p>
          </div>
        </div>

        {/* Comparison Section - Full Width */}
        <div className='w-full max-w-none'>
          <div className='bg-terminal-bg p-8'>
            {/* Comparison Table */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-terminal-border'>
                    <th className='text-center py-4 px-6 text-3xl font-ibm text-terminal-green font-bold w-1/2'>
                      λstepweaver
                    </th>
                    <th className='text-center py-4 px-6 text-3xl font-ibm text-terminal-text font-bold w-1/2'>
                      Traditional Agency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b border-terminal-border'>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                          Direct, Founder-Led Attention
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Work directly with the person who builds your
                          solution—no middle layers, no information lost in
                          translation.
                        </p>
                      </div>
                    </td>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                          Account Managers & Handoffs
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Most work is delegated down the line. You rarely talk
                          to the expert actually doing the work.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='border-b border-terminal-border'>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                          Agile, Rapid Iteration
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Lightweight, flexible process adapts fast—no waiting
                          for status meetings or lengthy approvals. Get real
                          progress, week by week.
                        </p>
                      </div>
                    </td>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                          Slow, Waterfall Process
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Long timelines, slow feedback loops, and rigid
                          processes that drag out delivery.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='border-b border-terminal-border'>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                          Transparent, Fair Pricing
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Low overhead means more value for your budget—what you
                          pay goes into building, not agency overhead.
                        </p>
                      </div>
                    </td>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                          High Overhead, Inflated Costs
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          You're billed for layers of management, fancy offices,
                          and admin—not just the work.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='border-b border-terminal-border'>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-green font-bold mb-2'>
                          Hands-On Collaboration
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Ideas flow directly—review, iterate, and ship faster.
                          Communication is human, not corporate.
                        </p>
                      </div>
                    </td>
                    <td className='py-6 px-6 align-top text-center'>
                      <div>
                        <h4 className='text-lg font-ibm text-terminal-text font-bold mb-2'>
                          Impersonal Communication
                        </h4>
                        <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                          Feedback gets filtered through managers, delaying
                          fixes and adding friction.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Statement */}
            <div className='mt-8 pt-6'>
              <p className='text-terminal-text font-ibm text-2xl font-bold text-center'>
                The solo advantage: sharper, faster, more personal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
