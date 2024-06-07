import { search } from '@/services/searchRequest';
import { Autocomplete, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ImLocation } from 'react-icons/im';
import { debounce } from '@mui/material';
import axios from 'axios';
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
  const [loadedValue, setLoadedValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let input;
    if (inputValue) {
      input = inputValue;
    } else {
      input = loadedValue;
    }
    const { process, cancel } = search(input);
    process((options: []) => {
      setOptions(options);
    });
    return () => cancel();
  }, [inputValue, loadedValue]);

  const searchDelayed = useCallback(
    debounce((newValue: string) => setInputValue(newValue), 2000),
    [],
  );

  useEffect(() => {
    const fetchIP = async () => {
      const res = await axios.get('https://geolocation-db.com/json/');
      if (!res.data) throw new Error("Can't fetch data");
      const returnedData = res.data.country_name.toLowerCase();
      setLoadedValue(returnedData);
    };
    fetchIP();
  }, []);
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
              searchDelayed(newInputValue);
            }}
            sx={{ width: '100%' }}
            getOptionLabel={(option) => option.city || ''}
            renderOption={(props, option: any) => {
              return (
                <li
                  {...props}
                  className="bg-base-light hover:bg-base-500 hover:text-base-light cursor-pointer text-base-900 py-2 border-y border-white transition ease-in-out duration-300"
                >
                  <span className="px-2 inline-flex items-center gap-1">
                    <ImLocation />
                    {option.city}
                  </span>
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
                  // endAdornment: (
                  //   <>{searchIsLoading ? <CircularProgress color="inherit" size={20} /> : null}</>
                  // ),
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
