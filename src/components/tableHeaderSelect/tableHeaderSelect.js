import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import styles from "./tableHeaderSelect.module.css";

export function TableHeaderSelect(props) {

    const { id, index, placeholder, value, width, handleHeaderSelectChange } = props;

    const [popUp, setPopUp] = useState(false);
    const [filterValue, setFilterValue] = useState(placeholder);
    const [headerColor, setHeaderColor] = useState("lightgray");

    const handlePopUp = (boolean) => {
        setPopUp(boolean);
    }

    const handleChange = (event) => {
        if (event.target.value === "") {
            setFilterValue(placeholder);
            handlePopUp(false);
            handleHeaderSelectChange(id, event.target.value);
            setHeaderColor("lightgray");
        }
        else {
            setFilterValue(event.target.value)
            handlePopUp(false);
            handleHeaderSelectChange(id, event.target.value);
            setHeaderColor("black");
        }
    }

    return (
        <ClickAwayListener onClickAway={() => setPopUp(false)}>
            <th className={styles.th} style={{ minWidth: width }} key={index}>
                <div className={styles.container}>
                    {popUp
                        ? <div className={styles.popup}>
                            <button className={styles.header} value={""} onClick={handleChange}>{placeholder}</button>
                            {value.map((user, index) => {
                                return <button className={styles.options} value={user} key={index} onClick={handleChange}>{user}</button>
                            })}
                        </div>
                        : <div className={styles.innerDiv} onClick={() => handlePopUp(true)}>
                            <button className={styles.button} style={{ color: headerColor }}>
                                {filterValue}
                            </button>
                            <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                        </div>
                    }
                </div>
            </th >
        </ClickAwayListener>
    );
}
