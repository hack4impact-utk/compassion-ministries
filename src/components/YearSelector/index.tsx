'use client';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import {
  IconButton,
  Button,
  Typography,
  Popover,
  ListItemButton,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

interface YearSelectorProps {
  selectedYear: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export default function YearSelector(props: YearSelectorProps) {
  const MIN_YEAR = 2024;
  const CURR_YEAR = new Date().getFullYear();
  const YEAR_OPTIONS: number[] = [];

  // all years from now to 2024 (launch date) in descending order
  for (let i = CURR_YEAR; i >= MIN_YEAR; i--) {
    YEAR_OPTIONS.push(i);
  }

  // what the year dropdown is tied to. Only visible if !== null
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        size="small"
        disabled={props.selectedYear === MIN_YEAR}
        onClick={() => props.onChange((currYear) => currYear - 1)}
      >
        <ArrowBackIosNew sx={{ width: 15, height: 15 }} />
      </IconButton>
      <Button
        variant="text"
        size="large"
        sx={{ width: '5rem', color: 'black' }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Typography variant="h6">{props.selectedYear}</Typography>
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
            selected={option === props.selectedYear}
            autoFocus={option === props.selectedYear}
            onClick={() => {
              props.onChange(option);
              setAnchorEl(null);
            }}
          >
            <Typography sx={{ p: 1 }}>{option}</Typography>
          </ListItemButton>
        ))}
      </Popover>

      <IconButton
        size="small"
        disabled={props.selectedYear === CURR_YEAR}
        onClick={() => props.onChange((currYear) => currYear + 1)}
      >
        <ArrowForwardIos sx={{ width: 15, height: 15 }} />
      </IconButton>
    </>
  );
}
