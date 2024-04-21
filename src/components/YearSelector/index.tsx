'use client';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import {
  IconButton,
  Button,
  Typography,
  Popover,
  ListItemButton,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const MIN_YEAR = 2024;
export default function YearSelector() {
  // what the year dropdown is tied to. Only visible if !== null
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [CURR_YEAR, setCurrYear] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedYear: number = parseInt(
    searchParams.get('year') || String(MIN_YEAR)
  );

  // whenever the user updates the year, update the search params
  const updateQueryParam = useCallback(
    (newYear: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('year', newYear.toString());

      params.toString();
      router.push(pathname + '?' + params);
    },
    [pathname, router, searchParams]
  );

  // all years from now to 2024 (launch date) in descending order
  useEffect(() => {
    const currYear = new Date().getFullYear();
    setCurrYear(currYear);
    updateQueryParam(currYear);
  }, [updateQueryParam]);

  // sets initial year options. Includes all years from 2024 to current year
  const YEAR_OPTIONS = useMemo(() => {
    const options: number[] = [];
    for (let i = CURR_YEAR; i >= MIN_YEAR; i--) {
      options.push(i);
    }
    return options;
  }, [CURR_YEAR]);

  return (
    <>
      <IconButton
        size="small"
        disabled={selectedYear <= MIN_YEAR}
        onClick={() => updateQueryParam(selectedYear - 1)}
      >
        <ArrowBackIosNew sx={{ width: 15, height: 15 }} />
      </IconButton>
      <Button
        variant="text"
        size="large"
        sx={{ width: '5rem', color: 'black' }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Typography variant="h6">{selectedYear}</Typography>
      </Button>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {YEAR_OPTIONS.map((option) => (
          <ListItemButton
            key={option}
            selected={option === selectedYear}
            autoFocus={option === selectedYear}
            onClick={() => {
              updateQueryParam(option);
              setAnchorEl(null);
            }}
          >
            <Typography sx={{ p: 1 }}>{option}</Typography>
          </ListItemButton>
        ))}
      </Popover>

      <IconButton
        size="small"
        disabled={selectedYear >= CURR_YEAR}
        onClick={() => updateQueryParam(selectedYear + 1)}
      >
        <ArrowForwardIos sx={{ width: 15, height: 15 }} />
      </IconButton>
    </>
  );
}
