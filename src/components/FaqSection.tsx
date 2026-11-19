import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/packagingData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section
      id="faq"
      className="border-b border-white/8 bg-[#101B2A]/45 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#A5F044]">
            Frequently Asked Questions
          </p>
          <h2
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Procurement &amp; Custom Packaging Answers
          </h2>
        </div>

        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#071526]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="px-6 py-4 sm:px-7">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A5F044]"
                >
                  <span className="font-display text-base font-semibold text-white sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#A5F044] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-3 pt-1 text-sm leading-relaxed text-[#AEB8C5]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
