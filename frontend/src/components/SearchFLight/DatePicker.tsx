import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { appAction } from '../../redux/app/appSlice';
import { useDisPatch } from '../../redux/hooks';
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
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        return (
          <DatePicker
            value={value ? value : null}
            onChange={(newValue: any) => {
              onChange(newValue ? newValue : null);
              if (name === 'departureDate') dispatch(appAction.selectDepartureDate(newValue.$d));
              if (name === 'arrivalDate') dispatch(appAction.selectArrivalDate(newValue.$d));
            }}
            sx={{ width: '100%' }}
          />
        );
      }}
    />
  );
};

export default Date;
