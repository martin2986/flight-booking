import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { flightClient } from '../../auth/apiClient';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';

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
}: AutoCompleteInputProps<T, TField>) => {
  const [fetchedData, setFetchedData] = useState<any>();
  const dispatch = useDisPatch();
  const handleInputChange = async (e: SyntheticEvent, value: string) => {
    if (!value.length) return;
    const response = await flightClient.get(`/auto-complete?query=${value}`);
    if (!response) throw new Error('Could not fetch query data');
    setFetchedData(response.data);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <Autocomplete
            value={value ? value : null}
            onChange={(e: SyntheticEvent, newValue) => {
              onChange(newValue ? newValue : null);
              if (name === 'origin')
                dispatch(appAction.setOrigin(newValue?.presentation.suggestionTitle));
              if (name === 'destination')
                dispatch(appAction.setDestination(newValue?.presentation.suggestionTitle));
            }}
            getOptionLabel={(option: any) => option?.navigation.localizedName || null}
            options={fetchedData?.data.map((item: any) => item) || []}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onInputChange={handleInputChange}
            freeSolo
            sx={{ width: '100%' }}
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
