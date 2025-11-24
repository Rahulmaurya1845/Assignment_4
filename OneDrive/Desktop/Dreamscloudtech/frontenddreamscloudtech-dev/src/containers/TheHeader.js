// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { set, selectSidebarShow } from "../store/slices/appSlice";
// import {
//     CHeader,
//     CToggler,
//     CHeaderNav,
//     CSubheader,
//     CBreadcrumbRouter,
// } from "@coreui/react";
// import SearchIcon from "@material-ui/icons/Search";
// import { selectUser } from "../store/slices/userSlice";


// import {
//     TheHeaderDropdown,
//     TheHeaderDropdownMssg,
//     TheHeaderDropdownNotif,
// } from "./index";
// import { Link } from "react-router-dom";

// const TheHeader = ({ routes }) => {
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);
//     const [search, setsearch] = useState("");
//     const [resultsData, setresultsData] = useState([]);
//     const sidebarShow = useSelector(selectSidebarShow);

//     console.log(sidebarShow);
//     const handlesearch = (e) => {
//         e.preventDefault();

//         setsearch("");
//     };

//     const handleChange = (e) => {
//         setsearch(e);
//         let limit = e.length;
//         if (e !== "") {
//             let results = routes?.filter(
//                 (i) =>
//                     i?.name.slice(0, limit).toLowerCase().includes(e.toLowerCase()) ||
//                     i?.path.slice(0, limit).toLowerCase().includes(e.toLowerCase())
//             );
//             console.log(results);
//             setresultsData(results);
//         } else {
//             setresultsData([]);
//         }
//     };

//     const handleSelectLink = () => {
//         setresultsData([]);
//         setsearch("");
//     };

//     const toggleSidebar = () => {
//         console.log("totggle", sidebarShow);
//         const val = [true, "responsive"].includes(sidebarShow)
//             ? false
//             : "responsive";
//         dispatch(set(val));
//     };

//     const toggleSidebarMobile = () => {
//         const val = [false, "responsive"].includes(sidebarShow)
//             ? true
//             : "responsive";
//         dispatch(set(val));
//     };

//     return (
//         <CHeader withSubheader style={{
//             // backgroundColor: "#EEF7FF",
//             backgroundColor: "#8EC7FF",

//         }}>
//             <CToggler
//                 inHeader
//                 className="ml-md-3 d-lg-none"
//                 onClick={toggleSidebarMobile}
//             />
//             <CToggler
//                 inHeader
//                 className="ml-3 d-md-down-none"
//                 onClick={toggleSidebar}
//             />


//             <CHeaderNav className="d-md-down-none mr-auto search__container" >
//                 <form onSubmit={handlesearch} className="nav__search">
//                     <div className="input-container">
//                         <SearchIcon className="icon" />
//                         <input
//                             value={search}
//                             onChange={(e) => handleChange(e.target.value)}
//                             autoFocus={true}
//                             type="text"
//                             placeholder="Search..."
//                         />
//                     </div>
//                     <button type="submit" className="search-button">
//                         Search
//                     </button>
//                 </form>
//                 <ul className="search__results">
//                     {resultsData.length > 0 &&
//                         resultsData.map((res) => (
//                             <li key={res.path}>
//                                 <Link onClick={handleSelectLink} to={res.path}>
//                                     {res.name}
//                                 </Link>
//                             </li>
//                         ))}
//                 </ul>
//             </CHeaderNav>




//             <CHeaderNav className="px-0 nav__icons" style={{
//                 backgroundColor: "#8EC7FF",
//                 // backgroundColor: "#EEF7FF",
//                 border: "none",         // Removes the border
//                 boxShadow: "none"       // Removes the shadow
//             }}>

//                 <TheHeaderDropdownNotif id={user?.id} />
//                 <TheHeaderDropdownMssg id={user?.id} />
//                 <TheHeaderDropdown user={user} />
//             </CHeaderNav>


//             <CSubheader
//                 style={{
//                     // backgroundColor: "#EEF7FF",
//                     backgroundColor: "#ffffff",
//                     marginBottom: -0,
//                     height: "20px"
//                     // border: "none",         // Removes the border
//                     // boxShadow: "none"       // Removes the shadow
//                 }}
//                 className="px-3 justify-content-start"
//             >
//                 <CBreadcrumbRouter
//                     style={{

//                         border: "none",      // Removes any border within CBreadcrumbRouter
//                         boxShadow: "none",


//                         // Removes any shadow within CBreadcrumbRouter
//                     }}
//                     className="border-0 c-subheader-nav m-0 px-0 px-md-3"
//                     routes={routes}
//                 />
//             </CSubheader>

//         </CHeader>

//     );
// };

// export default TheHeader;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set, selectSidebarShow } from "../store/slices/appSlice";
import {
    CHeader,
    CToggler,
    CHeaderNav,
    CSubheader,
    CBreadcrumbRouter,
} from "@coreui/react";
import SearchIcon from "@material-ui/icons/Search";
import { selectUser } from "../store/slices/userSlice";
import {
    TheHeaderDropdown,
    TheHeaderDropdownMssg,
    TheHeaderDropdownNotif,
} from "./index";
import { Link, useLocation } from "react-router-dom";

const TheHeader = ({ routes }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const sidebarShow = useSelector(selectSidebarShow);
    const user = useSelector(selectUser);
    const [search, setsearch] = useState("");
    const [resultsData, setresultsData] = useState([]);

    // Determine if the current path is the home page
    const isHome = location.pathname === "/";

    // When on the home page, always fix sidebar state to true.
    useEffect(() => {
        if (isHome) {
            dispatch(set(true));
        }
    }, [isHome, dispatch]);

    const handlesearch = (e) => {
        e.preventDefault();
        setsearch("");
    };

    const handleChange = (e) => {
        setsearch(e);
        if (e !== "") {
            let results = routes?.filter(
                (i) =>
                    i?.name.slice(0, e.length).toLowerCase().includes(e.toLowerCase()) ||
                    i?.path.slice(0, e.length).toLowerCase().includes(e.toLowerCase())
            );
            setresultsData(results);
        } else {
            setresultsData([]);
        }
    };

    const handleSelectLink = () => {
        setresultsData([]);
        setsearch("");
    };

    // Disable toggling when on the home page
    const toggleSidebar = () => {
        if (isHome) return;
        const val = [true, "responsive"].includes(sidebarShow)
            ? false
            : "responsive";
        dispatch(set(val));
    };

    const toggleSidebarMobile = () => {
        if (isHome) return;
        const val = [false, "responsive"].includes(sidebarShow)
            ? true
            : "responsive";
        dispatch(set(val));
    };

    return (
        <CHeader withSubheader style={{ backgroundColor: "#8EC7FF" }}>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />

            <CHeaderNav className="d-md-down-none mr-auto search__container">
                <form onSubmit={handlesearch} className="nav__search">
                    <div className="input-container">
                        <SearchIcon className="icon" />
                        <input
                            value={search}
                            onChange={(e) => handleChange(e.target.value)}
                            autoFocus={true}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
                {/* Display the dropdown if results are available */}
                {resultsData.length > 0 && (
                    <div className="search__dropdown">
                        {resultsData.map((res) => (
                            <Link
                                key={res.path}
                                to={res.path}
                                onClick={() => handleSelectLink(res.path)}
                                className="search__result-item"
                            >
                                {res.name}
                            </Link>
                        ))}
                    </div>
                )}
            </CHeaderNav>

            <CHeaderNav
                className="px-0 nav__icons"
                style={{
                    backgroundColor: "#8EC7FF",
                    border: "none",
                    boxShadow: "none",
                }}
            >
                <TheHeaderDropdownNotif id={user?.id} />
                <TheHeaderDropdownMssg id={user?.id} />
                <TheHeaderDropdown user={user} />
            </CHeaderNav>

            <CSubheader
                style={{
                    backgroundColor: "#ffffff",
                    marginBottom: 0,
                    height: "20px",
                }}
                className="px-3 justify-content-start"
            >
                <CBreadcrumbRouter
                    style={{
                        border: "none",
                        boxShadow: "none",
                    }}
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
            </CSubheader>
        </CHeader>
    );
};

export default TheHeader;
