'use client';
import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
export const SearchField = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Set initial value of searchQuery from URL query parameter if available
    const q = router.refresh || {};
    console.log(q);
  }, [router.refresh]);

  // Handle changes in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    router.push(pathname + '?' + createQueryString('q', newSearchQuery));
  };

  // Function to create a query string with given name and value
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    // Render the TextField component for search input
    <TextField
      label="Search"
      value={searchQuery || searchParams.get('q')}
      onChange={handleSearchChange}
      variant="outlined"
      fullWidth
      InputLabelProps={{ shrink: Boolean(searchParams) }}
    />
  );
};

export default SearchField;
