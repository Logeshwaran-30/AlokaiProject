import { useState } from 'react';
import { SfDropdown, SfButton, SfLink, SfIconMoreHoriz } from '@storefront-ui/react';

const breadcrumbs = [
  {
    name: 'Home',
    link: '/',
  },
  { name: 'Category', link: '/category' },
  { name: 'Product details', link: '#' },
 
];

export function Breadcrumbs2() {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const close = () => {
    setDropdownOpened(false);
  };

  const toggle = () => {
    setDropdownOpened(!dropdownOpened);
  };

  return (
    <nav className="inline-flex font-normal font-body typography-text-sm">
      <ol className="flex items-center w-auto leading-none group md:flex-wrap">
        <li className="flex items-center sm:hidden text-neutral-500">
          <SfDropdown
            trigger={
              <SfButton
                className="relative w-5 h-5 !p-0 rounded-sm outline-secondary-600 hover:bg-transparent active:bg-transparent"
                aria-label="More breadcrumbs"
                variant="tertiary"
                slotPrefix={
                  <SfIconMoreHoriz
                    size="sm"
                    className="text-neutral-500 hover:text-primary-700 active:text-primary-800 active:bg-transparent"
                  />
                }
                square
                onClick={toggle}
              />
            }
            open={dropdownOpened}
            strategy="absolute"
            placement="bottom-start"
            onClose={close}
          >
            <div className="px-4 py-2 rounded-md shadow-md border-neutral-100">
              {breadcrumbs.map(({ name, link }) => (
                <li className="py-2 last-of-type:hidden" key={name}>
                  <SfLink
                    href={link}
                    variant="secondary"
                    className="leading-5 no-underline text-inherit hover:underline active:underline whitespace-nowrap outline-secondary-600"
                  >
                    {name}
                  </SfLink>
                </li>
              ))}
            </div>
          </SfDropdown>
        </li>
        {breadcrumbs.map((item, index) => (
          <li
            className="peer hidden sm:flex items-center peer-[:nth-of-type(even)]:before:content-['/'] peer-[:nth-of-type(even)]:before:px-2 peer-[:nth-of-type(even)]:before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 text-neutral-500 last-of-type:text-neutral-900 last-of-type:font-medium"
            key={item.name}
          >
            {index < breadcrumbs.length - 1 ? (
              <SfLink
                href={item.link}
                variant="secondary"
                className="leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-inherit"
              >
                {item.name}
              </SfLink>
            ) : (
              <span> {item.name} </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs2;

