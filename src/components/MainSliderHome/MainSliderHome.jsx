import sliderOne from '../../assets/images/slider-image-1.jpeg'
import sliderTwo from '../../assets/images/slider-image-2.jpeg'
import sliderThree from '../../assets/images/slider-image-3.jpeg'
import groceryBanner from '../../assets/images/grocery-banner-2.jpeg'
import freshBanner from '../../assets/images/grocery-banner.png'
import { Link } from 'react-router-dom'

const slides = [
  { image: sliderOne, eyebrow: 'Thoughtfully picked', title: 'Good finds. Better everyday.' },
  { image: sliderTwo, eyebrow: 'A little something for you', title: 'Make room for what you love.' },
  { image: sliderThree, eyebrow: 'Your next favorite is here', title: 'Discover your kind of good.' },
]

export default function MainSliderHome() {
  return (
    <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 py-6 sm:py-8 lg:grid-cols-12 lg:gap-5 lg:py-10">
      <div className="hero-carousel relative overflow-hidden rounded-[2rem] bg-textColor lg:col-span-8">
        <swiper-container
          slides-per-view="1"
          speed="650"
          loop="true"
          autoplay="true"
          autoplay-delay="4500"
          autoplay-disable-on-interaction="false"
          pagination="true"
          class="h-full"
        >
          {slides.map((slide) => (
            <swiper-slide key={slide.image} class="relative h-full">
              <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102d26]/90 via-[#102d26]/55 to-transparent" />
              <div className="relative flex h-full max-w-2xl flex-col items-start justify-center px-7 py-12 text-white sm:px-12 lg:px-16">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur sm:text-sm">
                  <span className="size-2 rounded-full bg-emerald-300" />
                  {slide.eyebrow}
                </span>
                <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-md text-base leading-7 text-white/80 sm:text-lg">
                  Lovely essentials, little upgrades, and new discoveries — all in one happy place.
                </p>
                <Link
                  to="/AllProducts"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-bold text-textColor shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  Explore the collection
                  <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true" />
                </Link>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
        <Link to="/AllProducts" className="promo-card group relative min-h-48 overflow-hidden rounded-[1.5rem] bg-emerald-100 sm:min-h-56 lg:min-h-0">
          <img src={groceryBanner} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102d26]/80 via-[#102d26]/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">Fresh picks</span>
            <h2 className="mt-1 text-lg font-bold sm:text-2xl">Everyday made better</h2>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
              Shop now <i className="fa-solid fa-arrow-right text-xs transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
        <Link to="/AllProducts" className="promo-card group relative min-h-48 overflow-hidden rounded-[1.5rem] bg-amber-100 sm:min-h-56 lg:min-h-0">
          <img src={freshBanner} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102d26]/80 via-[#102d26]/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Small joys</span>
            <h2 className="mt-1 text-lg font-bold sm:text-2xl">Find your new favorite</h2>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
              Take a look <i className="fa-solid fa-arrow-right text-xs transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
