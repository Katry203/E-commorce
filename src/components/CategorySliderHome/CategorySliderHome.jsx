import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import Error from '../Error/Error'

export default function CategorySliderHome() {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
    select: (response) => response.data.data,
  })

  if (isLoading) {
    return (
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:py-12" aria-label="Loading categories">
        <div className="mb-6 h-8 w-52 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </section>
    )
  }

  if (isError) {
    return <Error />
  }

  const settings = {
    dots: false,
    infinite: categories.length > 5,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: categories.length > 5,
    autoplaySpeed: 3000,
    speed: 600,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondColor">A good place to start</p>
          <h2 className="text-2xl font-bold tracking-tight text-textColor sm:text-3xl">Shop by category</h2>
        </div>
        <Link to="/AllProducts" className="hidden items-center gap-2 text-sm font-bold text-emerald-800 transition hover:gap-3 sm:inline-flex">
          View all <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
        </Link>
      </div>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2 pb-2">
            <Link
              to={`/Categories/${encodeURIComponent(category.name)}`}
              className="category-card group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-emerald-50">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="px-3 py-3 text-center text-sm font-bold text-textColor transition group-hover:text-emerald-800 sm:text-base">
                {category.name}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  )
}
