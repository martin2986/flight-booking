import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { flightClient } from '../../auth/apiClient';
type AutoCompleteInputProps<T extends any, TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
  inputValue?: string;
  options?: T[];
};

const AutoCompleteInput = <T extends any, TField extends FieldValues>({
  control,
  name,
  label,
}: AutoCompleteInputProps<T, TField>) => {
  const [fetchedData, setFetchedData] = useState<[] | null>(null);

  const handleInputChange = async (e: SyntheticEvent, value: string | null) => {
    if (value) {
      const response = await flightClient.get(`/auto-complete?query=${value}`);
      if (!response || !response.status) throw new Error('Could not fetch query data');
      const { data } = response;
      const mappedResponse = data?.data?.map((item: any) => item);
      setFetchedData(mappedResponse);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value, ref } = field;

        return (
          <Autocomplete
            value={value ? value : null ?? null}
            onChange={(e: SyntheticEvent, newValue) => {
              onChange(newValue ? newValue : null);
            }}
            getOptionLabel={(option: any) => option?.navigation.localizedName || null}
            options={fetchedData ?? []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onInputChange={handleInputChange}
            freeSolo
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label={label} variant="outlined" inputRef={ref} />
            )}
          />
        );
      }}
    />
  );
};

export default AutoCompleteInput;
