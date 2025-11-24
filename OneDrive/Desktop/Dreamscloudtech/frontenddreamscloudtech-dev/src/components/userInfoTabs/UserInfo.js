import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getCapitalize, getIntial, getImgSrc } from '../../utils'
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice'



function StudentInfo({ id, name, surname, middleName, role, route, photoUrl }) {
    const user = useSelector(selectUser)
    return (
        <div className="content__container student__info " style={{ backgroundColor: "#EEF7FF", fontFamily: "poppins" }}>
            <Avatar className="avatar" src={getImgSrc(photoUrl)} alt={getCapitalize(name || "")} />
            <h5 className="mt-2" style={{ fontFamily: "poppins" }}>{getCapitalize(name || "")} {middleName && getIntial(middleName)}  {getCapitalize(surname || "")}</h5>
            <h6 style={{ fontFamily: "poppins" }}>{id}</h6>
            <div className="text-muted" style={{ fontFamily: "poppins" }}>{role}</div>
            {user?.role === "admin" &&
                <Link
                    to={`/${route}/edit/${id}`}
                    className="btn orange__btn sm__btn mt-2">

                    Edit
                </Link>
            }

        </div>
    )
}

export default StudentInfo