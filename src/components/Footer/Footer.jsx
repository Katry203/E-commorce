import amazonPay from '../../assets/images/amazon-pay.png'
import americanExpress from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import visa from '../../assets/images/visaLogo.png'
import paypal from '../../assets/images/paypal.png'
import appleStore from '../../assets/images/get-apple-store.png'
import googlePlay from '../../assets/images/get-google-play.png'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'

const socialLinks = [
  { label: 'Facebook', icon: 'fa-facebook-f', href: 'https://www.facebook.com/abdo.elkatry.90/?locale=ar_AR' },
  { label: 'LinkedIn', icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/in/abdelrahman-elkatry-0298b121a/' },
  { label: 'Instagram', icon: 'fa-instagram', href: 'https://www.instagram.com/abdelrhman.elkatry/' },
]

export default function Footer() {
  return (
    <footer className="mt-8 bg-[#f0f5f1]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:py-16">
        <div className="grid gap-10 border-b border-emerald-950/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="FreshCart home">
              <img src={logo} alt="FreshCart" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Thoughtful finds for everyday living. Discover something good, and make it yours.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-emerald-950/10 bg-white text-emerald-900 transition hover:bg-emerald-800 hover:text-white"
                >
                  <i className={`fa-brands ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-textColor">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><Link className="transition hover:text-emerald-800" to="/">Home</Link></li>
              <li><Link className="transition hover:text-emerald-800" to="/AllProducts">All products</Link></li>
              <li><Link className="transition hover:text-emerald-800" to="/Brands">Brands</Link></li>
              <li><Link className="transition hover:text-emerald-800" to="/WishList">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-textColor">Here to help</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a className="transition hover:text-emerald-800" href="mailto:abdelrahmanragab334@gmail.com">Get in touch</a></li>
              <li><a className="transition hover:text-emerald-800" href="tel:+201146114898">+2 (0) 114 611 4898</a></li>
              <li>Cairo, Egypt</li>
              <li><Link className="transition hover:text-emerald-800" to="/allorders">Track your orders</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-textColor">A little extra</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              New finds are always around the corner. Take a look at what just arrived.
            </p>
            <Link
              to="/AllProducts"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:gap-3"
            >
              Discover the collection <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-textColor">Secure payments</span>
            {[amazonPay, americanExpress, paypal, visa, mastercard].map((paymentLogo, index) => (
              <img
                key={paymentLogo}
                src={paymentLogo}
                alt={['Amazon Pay', 'American Express', 'PayPal', 'Visa', 'Mastercard'][index]}
                loading="lazy"
                className="h-7 w-12 rounded bg-white object-contain p-1"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="me-2 text-sm font-semibold text-textColor">Shop on the go</span>
            <img src={appleStore} alt="Download on the App Store" loading="lazy" className="h-9 w-auto" />
            <img src={googlePlay} alt="Get it on Google Play" loading="lazy" className="h-9 w-auto" />
          </div>
        </div>
      </div>

      <div className="bg-textColor px-4 py-4 text-xs text-white/70">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FreshCart. All rights reserved.</span>
          <span>Made for the things that make every day.</span>
        </div>
      </div>
    </footer>
  )
}
