import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { flightClient } from '../../auth/apiClient';

type AutoCompleteInputProps<T, TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
  inputValue?: string;
};

const AutoCompleteInput = <T, TField extends FieldValues>({
  control,
  name,
  label,
  inputValue,
}: AutoCompleteInputProps<T, TField>) => {
  const [fetchedData, setFetchedData] = useState<any>();
  const handleInputChange = async (e: any) => {
    const query = e.target.value;
    if (query === '') return;
    console.log(query);
    const response = await flightClient.get(`/auto-complete?query=${query}`);
    if (!response) throw new Error('Could not fetch query data');
    console.log(response.data);
    setFetchedData(response.data);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        console.log(value);
        return (
          <Autocomplete
            value={value ? value : null}
            onChange={(newValue) => {
              onChange(newValue ? newValue : null);
            }}
            getOptionLabel={(option: any) => option?.navigation.localizedName || null}
            options={fetchedData?.data.map((item: any) => item) || []}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onInputChange={handleInputChange}
            // freeSolo
            sx={{
              width: '100%',
              '& .MuiAutocomplete-endAdornment': {
                display: 'none',
              },
            }}
            renderInput={(params) => {
              return <TextField {...params} label={label} variant="outlined" inputRef={ref} />;
            }}
          />
        );
      }}
    />
  );
};

export default AutoCompleteInput;
