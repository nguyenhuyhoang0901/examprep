import { footerLinks } from '@/config/footerLinks'
import Link from 'next/link'

export default function FooterLinksDesktop() {
  return (
    <nav className="hidden md:grid grid-flow-col auto-cols-fr gap-8 py-12">
      {footerLinks.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold text-white mb-4">
            {group.title}
          </h3>

          {/* ✅ GROUP LINK */}
          {group.links && (
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* ✅ GROUP CONTACT */}
          {group.type === 'text' && (
            <ul className="space-y-2 text-sm text-gray-300">
              {group.items?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {/* 🔥 SVG ICON */}
                  {item.iconId && (
                    <svg className="w-4 h-4 text-gray-400">
                      <use href={`#${item.iconId}`} />
                    </svg>
                  )}
                
                  <span>{item.label}</span>
                
                  <a
                    href={item.href}
                    target="_blank"
                    className="hover:text-white underline"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}
