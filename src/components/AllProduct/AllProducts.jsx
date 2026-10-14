import { useContext, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { allProductPorvider } from '../../Context/ProductContextProvider'
import CategorySliderHome from '../CategorySliderHome/CategorySliderHome'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import Produtcs from '../Produtcs/Produtcs'

export default function AllProducts() {
  const { allPorduct = [], isLoading, isError } = useContext(allProductPorvider)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const searchTerm = searchParams.get('q') ?? ''

  const categories = useMemo(
    () => [...new Set(allPorduct.map((product) => product.category?.name).filter(Boolean))].sort(),
    [allPorduct],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const results = allPorduct.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(normalizedSearch)
      const matchesCategory = !selectedCategory || product.category?.name === selectedCategory
      return matchesSearch && matchesCategory
    })

    if (sortBy === 'price-low') {
      results.sort((first, second) => (first.priceAfterDiscount || first.price) - (second.priceAfterDiscount || second.price))
    } else if (sortBy === 'price-high') {
      results.sort((first, second) => (second.priceAfterDiscount || second.price) - (first.priceAfterDiscount || first.price))
    } else if (sortBy === 'rating') {
      results.sort((first, second) => second.ratingsAverage - first.ratingsAverage)
    }

    return results
  }, [allPorduct, searchTerm, selectedCategory, sortBy])

  function updateSearch(value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      nextParams.set('q', value)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
  }

  function clearFilters() {
    setSelectedCategory('')
    setSortBy('featured')
    setSearchParams({}, { replace: true })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <CategorySliderHome />
      <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:pb-16">
        <div className="mb-8 rounded-[2rem] bg-emerald-50 px-5 py-7 sm:px-8 sm:py-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">The whole collection</p>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-textColor sm:text-4xl">Find your next favorite</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore the collection and make your everyday a little more special.
              </p>
            </div>
            <span className="text-sm font-semibold text-emerald-900">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        <div className="mb-7 grid gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-[minmax(240px,1fr)_240px_220px_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
            <i className="fa-solid fa-magnifying-glass text-slate-400" aria-hidden="true" />
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search by product name..."
              className="w-full py-3 text-sm outline-none"
            />
          </label>
          <label className="sr-only" htmlFor="category-filter">Filter by category</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-textColor outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
          >
            <option value="">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <label className="sr-only" htmlFor="sort-products">Sort products</label>
          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-textColor outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            disabled={!searchTerm && !selectedCategory && sortBy === 'featured'}
            className="rounded-xl px-4 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            Clear filters
          </button>
        </div>

        {filteredProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => <Produtcs key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <i className="fa-solid fa-magnifying-glass text-xl" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-textColor">No matches this time</h2>
            <p className="mt-2 text-sm text-slate-500">Try another search or clear your filters to see everything.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-textColor px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Show all products
            </button>
            <Link to="/" className="sr-only">Return home</Link>
          </div>
        )}
      </section>
    </>
  )
}
