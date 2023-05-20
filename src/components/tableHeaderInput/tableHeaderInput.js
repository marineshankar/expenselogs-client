import styles from "./tableHeaderInput.module.css";


export default function TableHeaderInput(props) {

    const { id, tableHeaderIndex, placeholder, width, handleHeaderInputChange } = props;

    return (
        <th className={styles.container} style={{ minWidth: width, maxWidth: width }} key={tableHeaderIndex}>
            <input
                className={styles.input}
                placeholder={placeholder}
                onChange={(event) => handleHeaderInputChange(id, event.target.value)} />
        </th>
    );
}