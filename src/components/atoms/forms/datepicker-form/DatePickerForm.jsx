import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerForm.module.scss';
import { svgMap } from '../../../../helpers/render-icon/svgMap';
import Label from '../label/Label';

const DatePickerForm = ({
  label,
  name,
  formik,
  required,
  svgType,
  disabled,
  ...props
}) => {
  const formikValue = formik?.values?.[name];
  const formikError = formik?.errors?.[name];
  const formikTouched = formik?.touched?.[name];
  return (
    <div className={styles['input-container']}>
      {label && <Label text={label} required={required} />}

      <div
        className={`${styles['input-wrapper']} ${
          formikError && formikTouched ? styles['input-error'] : ''
        }`}
      >
        {svgType && (
          <img className={styles.svg} src={svgMap?.[svgType]} alt={svgType} />
        )}
        <div className={styles['img-input-cont']}>
          <DatePicker
            name={name}
            selected={formikValue}
            onChange={(val) => formik.onChange(val)}
            onBlur={formik.onBlur}
            disabled={disabled}
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MM/yyyy"
            placeholderText={`Select ${label}`}
            className={styles.input}
            {...props}
          />
        </div>
      </div>

      {formikError && formikTouched && (
        <div className={styles['error-message']}>{formikError}</div>
      )}
    </div>
  );
};

export default DatePickerForm;
