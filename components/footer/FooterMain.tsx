import FooterLinksDesktop from './FooterLinksDesktop'
import FooterLinksMobile from './FooterLinksMobile'

export default function FooterMain() {
  return (
    <section className="bg-gray-900 px-6">
      <div className="max-w-7xl mx-auto">
        <FooterLinksDesktop />
        <FooterLinksMobile />
      </div>
    </section>
  )
}
