import { SfButton } from '@storefront-ui/react';
import { Link } from 'react-router-dom';

export default function Banner1() {
  return (
    <div className="relative min-h-[576px] mt-5">
      <picture>
        <source srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/hero-bg.png" media="(min-width: 768px)" />
        <img
          src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/hero-bg-mobile.png"
          className="absolute w-full h-full z-[-1] object-cover"
        />
      </picture>
      <div className="md:flex md:flex-row-reverse md:justify-center min-h-[576px] max-w-[1536px] mx-auto">
        <div className="flex flex-col md:basis-2/4 md:items-stretch md:overflow-hidden">
          <img
            src="/shoe.png" // Updated image
            alt="Product Image"
            className="h-3/4 object-cover object-left mt-4" // Added mt-4 to move the image down a little bit
          />
        </div>
        <div className="p-4 md:p-10 md:flex md:flex-col md:justify-center md:items-start md:basis-2/4 mb-20">
          <p className="typography-text-xs md:typography-text-sm font-bold tracking-widest text-neutral-500 uppercase">
            New Arrivals
          </p>
          <h1 className="typography-display-2 md:typography-display-1 md:leading-[67.5px] font-bold mt-2 mb-4">
          Sneaker Collection 
          </h1>
          <p className="typography-text-base md:typography-text-lg">
          Experience the pinnacle of comfort and style with AirMax Supreme. Designed for performance and crafted for the streets.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
           <Link to="/category" ><SfButton size="lg"> Order now </SfButton></Link>
           <Link to="/category"> <SfButton size="lg" className="bg-white" variant="secondary">
              Show more
            </SfButton></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
