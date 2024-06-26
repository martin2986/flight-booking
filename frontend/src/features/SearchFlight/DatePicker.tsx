import { useDisPatch } from '@/redux/hooks';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { searchAction } from './searchSlice';
type DatePickerProps<TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
};

const Date = <TField extends FieldValues>({ control, name }: DatePickerProps<TField>) => {
  const dispatch = useDisPatch();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <DatePicker
            value={value ? value : null}
            onChange={(newValue: any) => {
              onChange(newValue ? newValue : null);
              if (name === 'departureDate') dispatch(searchAction.selectDepartureDate(newValue.$d));
              if (name === 'arrivalDate') dispatch(searchAction.selectArrivalDate(newValue.$d));
            }}
            sx={{ width: '100%', color: '#123661' }}
          />
        );
      }}
    />
  );
};

export default Date;
