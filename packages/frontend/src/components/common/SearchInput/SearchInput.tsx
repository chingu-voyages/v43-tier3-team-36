/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';

import { InputField, type TInputFieldProps } from '@/components/ui';
import { useDebounce } from '@/hooks';

type Props = Partial<TInputFieldProps> & {
  onUpdate: (query: string) => void;
};

const SearchInput: React.FC<Props> = ({ onUpdate, ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 750);

  const searchValueChangedHandler = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  useEffect(() => {
    onUpdate(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <InputField
      value={searchValue}
      onChange={searchValueChangedHandler}
      {...props}
    />
  );
};

export default SearchInput;
