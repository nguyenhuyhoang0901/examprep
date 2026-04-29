'use client'

import { useState } from 'react'
import Link from 'next/link'
import { footerLinks } from '@/config/footerLinks'

export default function FooterLinksMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="md:hidden divide-y divide-gray-700">
      {footerLinks.map((group, index) => {
        const isOpen = openIndex === index

        return (
          <div key={group.title}>
            <button
              className="w-full flex justify-between items-center py-4 text-left text-white"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-medium">{group.title}</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <ul className="pb-4 space-y-2">
                {/* ✅ GROUP LINK (Dumps, Vouchers, Materials...) */}
                {group.links &&
                  group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block text-sm text-gray-300 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                {/* ✅ GROUP CONTACT */}
                {group.type === 'text' &&
                  group.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-300 flex items-center gap-2"
                    >
                      {/* 🔥 SVG ICON */}
                      {item.iconId && (
                        <svg className="w-4 h-4 text-gray-400 shrink-0">
                          <use href={`#${item.iconId}`} />
                        </svg>
                      )}
                    
                      <span>{item.label}</span>
                    
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        {item.value}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
