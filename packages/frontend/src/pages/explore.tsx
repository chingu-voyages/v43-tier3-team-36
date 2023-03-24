import { ReactElement, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { InputField } from '@/components/ui/Input';
import searchComics from '@/api';
import { useDebounce } from '@/hooks';
import ComicList from '@/components/ui/Comic/ComicList';
import AuthLayout from '@/layouts/AuthLayout';
import { NextPageWithLayout } from './_app';

const ComicSearch: NextPageWithLayout = () => {
  const [value, setValue] = useState('');

  const handleChange = (inputValue: string) => setValue(inputValue);
  const debouncedValue = useDebounce(value, 500);

  const { isLoading, data } = useQuery(
    ['search-marvel-comics', debouncedValue],
    () => searchComics(debouncedValue),
    { enabled: !!value.length, initialData: [] },
  );

  return (
    <main>
      <div className="p-2">
        <div className="mb-2 w-100 lg:w-72 px-5">
          <InputField
            placeholder="Search for a comic book..."
            value={value}
            onChange={handleChange}
            Icon={<MagnifyingGlassIcon className="h-5 w-5 text-grey-800" />}
            fullWidth
          />
        </div>

        <ComicList comics={data} isLoading={isLoading} />
      </div>
    </main>
  );
};

ComicSearch.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Comic search',
        meta: {
          description: 'Search comics to add to your collection',
        },
      }}
    >
      {page}
    </AuthLayout>
  );
};

export default ComicSearch;
