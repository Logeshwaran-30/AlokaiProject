const categories = [
    {
      title: `Women`,
      image: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/women_category.png',
      link:'/category/womens-clothing'
    },
    {
      title: `Men`,
      image: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/men_category.png',
      link:'/category/mens-clothing'
    },
    {
      title: `Jewels`,
      image:"../circular_jewels.png",
      link:"/category/jewellery"
    },
  ];
  export default function Categorycard() {
    return (
      <div className="flex flex-wrap gap-4 lg:gap-6 lg:flex-no-wrap">
        {categories.map(({ title, image,link }) => (
          <div className="relative min-w-[180px] flex-col max-w-[240px] group" key={title}>
            <a
              className="absolute w-full h-full z-[1] focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
              href={link}
              aria-label={title}
            />
            <img
              className="rounded-full bg-neutral-100 group-hover:shadow-xl group-active:shadow-none"
              src={image}
              alt={title}
              width="240"
              height="240"
            />
            <div className="flex justify-center">
              <a className="mt-4 font-semibold no-underline text-normal-900 typography-text-base group-hover:underline group-hover:text-primary-800 group-hover:font-normal group-active:text-primary-800 group-active:font-normal">
                {title}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
  