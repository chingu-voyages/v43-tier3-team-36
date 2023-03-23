import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { InputField } from '@/components/ui/Input';
import searchComics from '@/api';
import { useDebounce } from '@/hooks';
import ComicList from '@/components/ui/Comic/ComicList';

const ComicSearch: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (inputValue: string) => setValue(inputValue);
  const debouncedValue = useDebounce(value, 500);

  const { isLoading, data } = useQuery(
    ['search-marvel-comics', debouncedValue],
    () => searchComics(debouncedValue),
    { enabled: !!value.length, initialData: [] },
  );

  return (
    <div className="p-2">
      <div className="mb-2">
        <InputField
          placeholder="Search for a comic book..."
          value={value}
          onChange={handleChange}
          Icon={<MagnifyingGlassIcon className="h-5 w-5 text-grey-800" />}
        />
      </div>

      <ComicList comics={data} isLoading={isLoading} />
    </div>
  );
};

export default ComicSearch;
