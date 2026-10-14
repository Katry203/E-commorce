import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../Button/Button'
import { userContextProvider } from '../../Context/UserContextProvider'
import { cartUserProvuder } from '../../Context/CartProvider'
import logo from '../../assets/images/freshcart-logo.svg'

export default function Navbar() {
  const { token, settoken } = useContext(userContextProvider)
  const { numOfCartItems, displayAllCart } = useContext(cartUserProvuder)
  const [navIsOpen, setNavIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      displayAllCart().catch(() => toast.error("We couldn't refresh your cart right now."))
    }
  }, [token, displayAllCart])

  useEffect(() => {
    setSearchTerm(new URLSearchParams(location.search).get('q') ?? '')
  }, [location.search])

  function handleLogout() {
    localStorage.removeItem('token')
    settoken(null)
    setProfileOpen(false)
    setNavIsOpen(false)
    navigate('/Login')
  }

  function handleSearch(event) {
    event.preventDefault()
    const query = searchTerm.trim()
    navigate(query ? `/AllProducts?q=${encodeURIComponent(query)}` : '/AllProducts')
    setNavIsOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `transition-colors hover:text-secondColor ${isActive ? 'text-secondColor' : 'text-textColor'}`

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-textColor px-4 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
        <span className="text-emerald-300">A little treat for you</span>
        <span className="mx-2 text-white/40">·</span>
        Enjoy 10% off your first order with <span className="font-bold text-emerald-300">HEY10</span>
      </div>

      <nav className="border-b border-emerald-950/5 bg-white/95 shadow-sm backdrop-blur">
        <div className="container mx-auto flex min-h-[76px] items-center justify-between gap-4 px-4">
          <Link to="/" className="shrink-0" aria-label="FreshCart home">
            <img src={logo} alt="FreshCart" className="h-8 w-auto" />
          </Link>

          {token && (
            <div className="hidden items-center gap-6 font-semibold md:flex">
              <NavLink to="/" end className={linkClass}>Home</NavLink>
              <NavLink to="/Brands" className={linkClass}>Brands</NavLink>
              <NavLink to="/AllProducts" className={linkClass}>Shop</NavLink>
            </div>
          )}

          {token && (
            <form onSubmit={handleSearch} className="hidden max-w-md flex-1 lg:flex">
              <label htmlFor="site-search" className="sr-only">Search products</label>
              <div className="flex w-full items-center rounded-full border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-600/10">
                <i className="fa-solid fa-magnifying-glass text-slate-400" aria-hidden="true" />
                <input
                  id="site-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Find something you love..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
                />
                <button type="submit" className="text-sm font-semibold text-secondColor hover:text-emerald-800">
                  Search
                </button>
              </div>
            </form>
          )}

          <div className="flex shrink-0 items-center gap-4">
            {token ? (
              <>
                <Link
                  to="/WishList"
                  aria-label="Wishlist"
                  className="relative hidden p-2 text-textColor transition hover:text-secondColor sm:inline-flex"
                >
                  <i className="fa-regular fa-heart text-lg" aria-hidden="true" />
                </Link>
                <Link
                  to="/Cart"
                  className="relative flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-textColor transition hover:bg-emerald-100"
                  aria-label={`Shopping cart, ${numOfCartItems} items`}
                >
                  <i className="fa-solid fa-bag-shopping text-emerald-800" aria-hidden="true" />
                  <span className="hidden text-sm font-semibold sm:inline">Cart</span>
                  <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-secondColor px-1 text-xs font-bold text-white">
                    {numOfCartItems}
                  </span>
                </Link>
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    aria-label="Open account menu"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen((open) => !open)}
                    className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-textColor transition hover:border-emerald-700 hover:text-emerald-800"
                  >
                    <i className="fa-regular fa-user" aria-hidden="true" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
                      <Link
                        to="/allorders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-textColor transition hover:bg-emerald-50"
                      >
                        <i className="fa-solid fa-box-open me-2 text-emerald-700" aria-hidden="true" />
                        My orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-2.5 text-left text-sm text-textColor transition hover:bg-emerald-50"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket me-2 text-emerald-700" aria-hidden="true" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => setNavIsOpen((open) => !open)}
                  aria-label={navIsOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={navIsOpen}
                  className="!mb-0 !me-0 !border-0 !p-2 text-xl text-textColor md:hidden"
                >
                  <i className={navIsOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} aria-hidden="true" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/Login" className="rounded-full px-4 py-2 text-sm font-semibold text-textColor transition hover:text-secondColor">
                  Sign in
                </Link>
                <Link to="/Register" className="rounded-full bg-secondColor px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
                  Join us
                </Link>
              </div>
            )}
          </div>
        </div>

        {token && navIsOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-4 shadow-lg md:hidden">
            <form onSubmit={handleSearch} className="mb-4 flex rounded-xl border border-slate-200 bg-slate-50 px-3">
              <label htmlFor="mobile-site-search" className="sr-only">Search products</label>
              <input
                id="mobile-site-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
              <button type="submit" aria-label="Search" className="px-2 text-emerald-800">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              </button>
            </form>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <NavLink to="/" end onClick={() => setNavIsOpen(false)} className={linkClass}>Home</NavLink>
              <NavLink to="/Brands" onClick={() => setNavIsOpen(false)} className={linkClass}>Brands</NavLink>
              <NavLink to="/AllProducts" onClick={() => setNavIsOpen(false)} className={linkClass}>Shop all</NavLink>
              <NavLink to="/WishList" onClick={() => setNavIsOpen(false)} className={linkClass}>Wishlist</NavLink>
              <NavLink to="/allorders" onClick={() => setNavIsOpen(false)} className={linkClass}>My orders</NavLink>
              <button type="button" onClick={handleLogout} className="text-left text-textColor transition hover:text-secondColor">
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
