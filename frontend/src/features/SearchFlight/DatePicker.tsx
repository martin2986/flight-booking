import { useDisPatch } from '@/redux/hooks';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AnimatePresence, motion } from 'framer-motion';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { searchAction } from './searchSlice';
type DatePickerProps<TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  show: boolean;
};

const Date = <TField extends FieldValues>({ control, name, show }: DatePickerProps<TField>) => {
  const dispatch = useDisPatch();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.5 }}
          style={{ overflow: 'hidden' }}
        >
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
                    if (name === 'departureDate')
                      dispatch(searchAction.selectDepartureDate(newValue.$d));
                    if (name === 'arrivalDate')
                      dispatch(searchAction.selectArrivalDate(newValue.$d));
                  }}
                  sx={{ width: '100%' }}
                />
              );
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Date;
