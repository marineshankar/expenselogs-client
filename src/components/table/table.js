import { TableHeaderSelect } from '../tableHeaderSelect/tableHeaderSelect';
import TableHeaderInput from '../tableHeaderInput/tableHeaderInput';
import UserListRoles from '../../pages/administration/userManagement/usersAndRoles/userListRoles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckBox from '../tableCheckBox/tableCheckBox';
import imageFile from "../../images/imageFile.png";
import folderFile from "../../images/folder.svg";
import textFile from "../../images/textFile.png";
import EditPopUp from '../EditPopup/editPopUp';
import "./table.css";


export default function Table(props) {

    const {
        data = [],
        roleData = [],
        width = "100%",
        modifyPopUp = [],
        headerColumns = [],
        onRowClick = () => null,
        contextOnChange = () => null,
        onRowDoubleClick = () => null,
        handleHeaderInputChange = () => null,
        handleHeaderSelectChange = () => null,
    } = props;

    return (
        <table className='userlist-table' cellSpacing={0} cellPadding={0} style={{ width: width }}>
            <thead className='userlist-thead'>
                <tr>
                    {headerColumns && headerColumns.map((dt, index) => {
                        if (dt.type === "input")
                            return (
                                <TableHeaderInput
                                    id={dt.id}
                                    width={dt.width}
                                    placeholder={dt.name}
                                    tableHeaderIndex={index}
                                    handleHeaderInputChange={handleHeaderInputChange}
                                />
                            )
                        else if (dt.type === "select")
                            return (
                                <TableHeaderSelect
                                    id={dt.id}
                                    index={index}
                                    width={dt.width}
                                    // value={dt.value}
                                    placeholder={dt.name}
                                    value={dt.value ? Object.values(dt.value).map((val) => val) : ""}
                                    handleHeaderSelectChange={handleHeaderSelectChange}
                                />
                            )
                        else if (dt.type === "role")
                            return (
                                <TableHeaderSelect
                                    id={dt.id}
                                    index={index}
                                    width={dt.width}
                                    placeholder={dt.name}
                                    value={roleData.map((dt) => dt.name)}
                                    handleHeaderSelectChange={handleHeaderSelectChange}
                                />
                            )
                        else if (dt.type === "moreVertIcon")
                            return (
                                <th index={index} style={{ color: "#CDD4E4", width: dt.width }}>
                                    <MoreVertIcon />
                                </th>
                            )
                        else if (dt.type === "checkBox")
                            return (
                                <th index={index} style={{ width: dt.width }}><CheckBox /></th>
                            )
                        else if (dt.type === "image")
                            return (
                                <th index={index} style={{ width: dt.width }}></th>
                            )
                        else if (dt.layoutType === "dataGrid")
                            return (<th className="datagrid-th" index={index}
                                style={{ maxWidth: dt.width, fontWeight: "500" }}> {dt.name}</th>)
                        else
                            return (<th index={index}> {dt.name}</th>);
                    })}
                </tr>
            </thead>
            <tbody className='tableBody'>
                {data.map((item, index) => {
                    return (<tr key={index} className='userlist-tr-td'>
                        {headerColumns.map((header, index) => {
                            if (header.id === "roles")
                                return (<td className='userlist-td-role' key={index}
                                    onClick={(event) => onRowClick(item, event)}
                                    onDoubleClick={(event) => onRowDoubleClick(item, event)}>
                                    <UserListRoles userRoles={item[header.id]} />
                                </td>);
                            else if (header.id === 'moreVertIcon')
                                return (<td className='userlist-td-icon' key={index} >
                                    <EditPopUp
                                        value={item}
                                        options={modifyPopUp}
                                        onChange={(option, value, key) => contextOnChange(option, value, key)} />
                                </td>);
                            else if (header.type === "checkBox")
                                return <td className='userlist-td-icon' key={index}><CheckBox /></td>
                            else if (header.type === "image") {
                                let imageData = "";
                                if (item[header.id] === ".txt") imageData = textFile;
                                else if (!item[header.id]) imageData = folderFile;
                                else imageData = imageFile;
                                return (<td className='userlist-td-icon' key={index}>
                                    <img src={imageData} alt={""} style={{ width: "28px", height: "24px" }} />
                                </td>);
                            }
                            else if (header.layoutType === "dataGrid")
                                return <td key={index} style={{ maxWidth: header.width }}>{item[header.id]}</td>
                            else
                                return (<td className="userlist-td" onDoubleClick={(event) => onRowDoubleClick(item, event)}
                                    onClick={(event) => onRowClick(item, event)} key={index}>{item[header.id]}</td>)
                        })}
                    </tr>)
                })}
            </tbody>
        </table >
    );
}


