import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

interface RadioButtonProps {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={name}
        value={value}
        onChange={(event) => onChange(event, event.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                sx={{
                  color: 'var(--primary-main)',
                  '&.Mui-checked': { color: 'var(--primary-main)' },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
