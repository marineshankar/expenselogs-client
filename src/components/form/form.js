import "./form.css";

const Form = (props) => {
    const { list, data, setData, edit = true,
        handleSubmit = () => { },
        handleValidation = () => { },
        handleCancel = () => { },
        errorData,
        setError = () => { },
        disable = false } = props;

    const handleChange = (value, id) => {
        setData({ ...data, [id]: value });
        handleValidation(value, id);
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            {list.map((dt, index) => {
                if (dt.type === "input") {
                    return (<div key={index}>
                        <label>{dt.label}</label>
                        <input
                            id={dt.id}
                            type={dt.inputType}
                            defaultValue={dt.value}
                            onChange={(e) => handleChange(e.target.value, dt.id)}
                            disabled={!edit}
                            autoComplete="off" />
                        <span>{errorData && errorData[dt.id] ? errorData[dt.id] : ""}</span>
                    </div>)
                }
                else if (dt.type === "submit") {
                    return (<div key={index}>
                        {dt.label === "CANCEL"
                            ? <input style={{ backgroundColor: "white", color: "navy", border: "1px solid navy", marginTop: "10px" }}
                                type={dt.inputType} value={dt.label} onClick={handleCancel} />
                            : <input style={disable == true ? { backgroundColor: "grey", color: "black" } : {}} type={dt.inputType} value={dt.label} disabled={disable} />}
                    </div>)
                }
                else if (dt.type === "disabled") {
                    return (<div key={index}>
                        <label>{dt.label}</label>
                        <input type={dt.inputType} value={dt.value} disabled />
                    </div>)
                }
                else if (dt.type === "textarea") {
                    return (<div key={index}>
                        <label>{dt.label}</label>
                        <textarea rows={dt.rows} type={dt.inputType} defaultValue={dt.value} />
                    </div>)
                }
                else return null;
            })}
        </form>
    )
}

export default Form;