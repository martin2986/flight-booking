import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { search } from '@/services/searchRequest';
import { LocationOn as PinIcon } from '@mui/icons-material';
import { Autocomplete, Grid, TextField } from '@mui/material';
type SearchProps<T extends any, TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
  inputValue?: string;
  options?: T[];
};

const Search = <T extends any, TField extends FieldValues>({
  control,
  name,
  label,
}: SearchProps<T, TField>) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const { process, cancel } = search(inputValue);
    process((options: []) => {
      setOptions(options);
    });
    return () => cancel();
  }, [inputValue]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value, ref } = field;
        return (
          <Autocomplete
            autoComplete
            autoHighlight
            freeSolo
            disableClearable
            blurOnSelect
            clearOnBlur
            value={value || ''}
            options={options}
            onChange={(_, newValue: any) => {
              onChange(newValue);
            }}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            sx={{ width: '100%' }}
            getOptionLabel={(option) => option.city || ''}
            renderOption={(props, option: any) => {
              return (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <PinIcon sx={{ width: '25px', marginRight: '0.1rem' }} />
                    </Grid>
                    <Grid item xs>
                      <span>{option.city}</span>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
            renderInput={(props) => (
              <TextField
                {...props}
                placeholder="Search"
                label={label}
                variant="outlined"
                InputProps={{
                  ...props.InputProps,
                }}
                inputRef={ref}
              />
            )}
          />
        );
      }}
    />
  );
};

export default Search;
