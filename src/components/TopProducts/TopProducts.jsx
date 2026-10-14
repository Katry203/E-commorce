import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { allProductPorvider } from '../../Context/ProductContextProvider'
import Error from '../Error/Error'
import Produtcs from '../Produtcs/Produtcs'

export default function TopProducts() {
  const { allPorduct, isLoading, isError } = useContext(allProductPorvider)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  const popularProducts = [...allPorduct]
    .sort((first, second) => second.ratingsAverage - first.ratingsAverage)
    .slice(0, 8)

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 text-center sm:py-12">
      <div className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondColor">A few customer favorites</p>
        <h2 className="text-2xl font-bold tracking-tight text-textColor sm:text-3xl">Popular right now</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          The little upgrades and everyday essentials people keep coming back for.
        </p>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {popularProducts.map((product) => (
          <Produtcs key={product.id} product={product} />
        ))}
      </div>
      <Link
        to="/AllProducts"
        className="inline-flex items-center gap-3 rounded-full bg-textColor px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
      >
        Browse all products
        <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
      </Link>
    </section>
  )
}
