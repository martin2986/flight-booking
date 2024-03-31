import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { flightClient } from '../auth/apiClient';

type AutoCompleteInputProps<T, TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
};

const AutoCompleteInput = <T, TField extends FieldValues>({
  control,
  name,
  label,
}: AutoCompleteInputProps<any, TField>) => {
  const [fetchedData, setFetchedData] = useState<any>();
  const handleInputChange = async (e: any) => {
    const query = e.target.value;
    if (query === '') return;
    const response = await flightClient.get(`/auto-complete?query=${query}`);
    setFetchedData(response.data);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        // console.log(value);
        return (
          <Autocomplete
            value={value ? value ?? null : null}
            freeSolo
            onChange={(e: any, newvalue) => {
              onChange(newvalue ? newvalue : null);
            }}
            onInputChange={handleInputChange}
            id="controllable-states-demo"
            getOptionLabel={(option: any) => option?.navigation.localizedName || null}
            options={fetchedData?.data.map((item: any) => item) || []}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            sx={{ width: 200 }}
            renderInput={(params) => {
              return <TextField {...params} label={label} variant="standard" inputRef={ref} />;
            }}
          />
        );
      }}
    />
  );
};

export default AutoCompleteInput;
