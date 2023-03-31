import { ReactElement, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { InputField } from '@/components/ui/Input';
import { addComic, searchComics } from '@/api';
import { useDebounce } from '@/hooks';
import AuthLayout from '@/layouts/AuthLayout';
import ComicList from '@/components/comic/ComicList';
import { NextPageWithLayout } from '../_app';
import TComicItem from '@/types/comic';
import AddComic from '@/components/comic/AddComic';
import { createImageUrl } from '@/utils';
import ExploreLayout from '@/layouts/ExploreLayout';

const ComicSearch: NextPageWithLayout = () => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<TComicItem>();

  const handleChange = (inputValue: string) => setValue(inputValue);
  const debouncedValue = useDebounce(value, 500);

  const { isLoading, data } = useQuery(
    ['search-marvel-comics', debouncedValue],
    () => searchComics(debouncedValue),
    { enabled: !!value.length, initialData: [] },
  );

  const handleAddComic = (comic: TComicItem) => {
    addComic({
      comicId: comic.id,
      title: comic.title,
      imageUrl: createImageUrl(comic.images),
    });
  };

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
        {selected && (
          <AddComic
            comic={selected}
            onAdd={() => handleAddComic(selected)}
            onClose={() => setSelected(undefined)}
            show={!!selected}
          />
        )}
        <ComicList
          comics={data}
          isLoading={isLoading}
          onAddComic={(comic) => setSelected(comic)}
        />
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
      {/* nested explore layout */}
      <ExploreLayout>{page}</ExploreLayout>
    </AuthLayout>
  );
};

export default ComicSearch;
