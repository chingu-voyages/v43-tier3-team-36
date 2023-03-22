import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounce';
import useSearchResource from '@/hooks/useSearchResource';

type TComicType = {
  id: number;
  title: string;
  issueNumber: number;
  url: string;
};

const ComicSearch: React.FC = () => {
  const [value, setValue] = useState('');
  const handleChange = (inputValue: string) => setValue(inputValue);
  const debouncedValue = useDebounce(value, 750);
  const { results } = useSearchResource<TComicType[]>(
    `${process.env.NEXT_PUBLIC_API}/comics?titleStartsWith=${debouncedValue}&apikey=${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
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
      {!results?.length ? (
        <h2>No results</h2>
      ) : (
        <div>
          {results?.map((result) => (
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
