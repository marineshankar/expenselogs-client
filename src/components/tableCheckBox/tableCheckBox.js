import styles from './tableCheckBox.module.css'
import { useState } from 'react';

function useToggle(initial) {
  const [checked, setChecked] = useState(initial)
  return [checked ? Checked : Unchecked, setChecked]
}

const CheckBox = ({ onChange }) => {
  const [CheckedComponent, setChecked] = useToggle(false)
  const changeHandler = (e) => {
    setChecked((prev) => !prev)
    if (onChange)
      onChange(e.target.checked)
  }
  return (
    <label className={styles.customcb}>
      <CheckedComponent />
      <input type="checkbox"
        onChange={changeHandler} />
    </label>
  );
}

const Unchecked = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  )
}

const Checked = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z" />
    </svg>
  )
}

export default CheckBox;
