import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartUserProvuder } from '../../Context/CartProvider'
import { wishList } from '../../Context/WishListPorvider'

export default function Produtcs({ product }) {
  const { addToCart } = useContext(cartUserProvuder)
  const { addToWishList } = useContext(wishList)
  const discountedPrice = product.priceAfterDiscount
  const discount = discountedPrice
    ? Math.round(((product.price - discountedPrice) / product.price) * 100)
    : 0
  const productUrl = `/ProdcuDetails/${product.id}/${encodeURIComponent(product.category?.name ?? '')}`

  return (
    <article className="product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-950/5 sm:p-4">
      <div className="relative overflow-hidden rounded-xl bg-slate-50">
        <Link to={productUrl} aria-label={`View ${product.title}`}>
          <img
            src={product.imageCover}
            alt={product.title}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Add ${product.title} to wishlist`}
            onClick={() => addToWishList(product.id)}
            className="flex size-9 items-center justify-center rounded-full bg-white text-textColor shadow-md transition hover:bg-rose-50 hover:text-rose-600"
          >
            <i className="fa-regular fa-heart" aria-hidden="true" />
          </button>
          <Link
            to={productUrl}
            aria-label={`View ${product.title}`}
            className="flex size-9 items-center justify-center rounded-full bg-white text-textColor shadow-md transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            <i className="fa-regular fa-eye" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {product.category?.name ?? 'FreshCart find'}
        </p>
        <Link
          to={productUrl}
          title={product.title}
          className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-textColor transition hover:text-emerald-800 sm:text-base"
        >
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-bold text-textColor">
              {discountedPrice || product.price} <span className="text-xs font-medium text-slate-500">EGP</span>
            </span>
            {discountedPrice && (
              <span className="text-xs text-slate-400 line-through">{product.price} EGP</span>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-600">
            <i className="fa-solid fa-star text-amber-400" aria-hidden="true" />
            {Number(product.ratingsAverage || 0).toFixed(1)}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400">{product.ratingsQuantity} reviews</span>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 transition hover:bg-emerald-800 hover:text-white sm:px-4 sm:text-sm"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
