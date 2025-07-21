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
          <div className='border-t border-terminal-border pt-6'>
            <p className='text-terminal-text font-ocr text-lg leading-relaxed'>
              No black boxes. No disappearing acts. Just a transparent process
              and responsive communication—from kickoff to launch (and beyond).
              That's how λstepweaver turns "someday" projects into shipping
              realities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
