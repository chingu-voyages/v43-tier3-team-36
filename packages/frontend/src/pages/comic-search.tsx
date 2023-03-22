import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { InputField } from '@/components/ui/Input';
import searchComics from '@/api';
import useDebounce from '@/hooks/useDebounce';

const ComicSearch: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (inputValue: string) => setValue(inputValue);
  const debouncedValue = useDebounce(value, 500);

  const { isLoading, data, error } = useQuery(
    ['search-marvel-comics', debouncedValue],
    () => searchComics(debouncedValue),
    { enabled: !!value.length },
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
      {isLoading && <h2>Loading..</h2>}
      {!data?.length && !isLoading ? (
        <h2>No results</h2>
      ) : (
        <div>
          {data?.map((result) => (
            <div className="p-2 m-2 border" key={result.id}>
              <h2> id: {result.id}</h2>
              <h2> title: {result.title}</h2>
              <h2> issue number{result.issueNumber}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComicSearch;
