type Item = { label: string; value: string; href: string; iconId?: string }
type Group = { title: string; type?: string; links?: { label: string; href: string }[]; items?: Item[] }

export const footerLinks: Group[] = [
  {
    title: 'Dumps',
    links: [
      { label: 'Amazon', href: '/exams/amazon' },
      { label: 'Microsoft', href: '/exams/microsoft' },
      { label: 'Juniper', href: '/exams/juniper' },
      { label: 'See all Dumps', href: '/exams' },
    ],
  },
  {
    title: 'Vouchers',
    links: [{ label: 'See all Exam Vouchers', href: '/vouchers' }],
  },
  {
    title: 'Contact',
    type: 'text',
    items: [
      { label: 'Email:', value: 'sp.examprep@gmail.com', href: 'mailto:sp.examprep@gmail.com' },
      { label: 'Zalo:', value: 'zalo/examprep', href: 'https://zalo.me/0386989724' },
      { label: 'Facebook:', value: 'facebook.com/examprep', href: 'https://www.facebook.com/groups/24998889806451870' },
    ],
  },
]
