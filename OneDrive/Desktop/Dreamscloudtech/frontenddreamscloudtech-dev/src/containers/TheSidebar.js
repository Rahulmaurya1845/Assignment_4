import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from "@coreui/react";
import { selectSidebarShow, set } from "../store/slices/appSlice";
import { logoname, logosmall, school_name } from "../store/environment";

import "../scss/custom-styles.scss";

const TheSidebar = ({ navs }) => {
    const dispatch = useDispatch();
    const show = useSelector(selectSidebarShow);

    return (
        <CSidebar
            className="sidebar__main"
            show={show}
            onShowChange={(val) => dispatch(set(val))}
            style={{ width: '255px', backgroundColor: "#EEF7FF" }}
        >
            <CSidebarBrand
                className="d-md-down-none nav__brand"
                to="/"
                style={{ backgroundColor: "#EEF7FF" }}
            >
                <div style={{ display: "flex", alignItems: "center", backgroundColor: "#EEF7FF", width: "100%" }}>
                    {logoname && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "13px" }}>
                        <img
                            className="c-sidebar-brand-full"
                            src={logoname}
                            alt="logo-negative"
                            height={70}
                            style={{ backgroundColor: "#EEF7FF", objectFit: "contain", objectFit: "cover", width: "100%" }}
                        />
                    </div>}
                    {logosmall && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                        <img
                            className="c-sidebar-brand-full"
                            src={logosmall}
                            alt="logo-negative"
                            height={70}
                            width={70}
                            style={{ backgroundColor: "#EEF7FF", objectFit: "contain" }}
                        />
                        <span style={{
                            color: "#3c4b64",
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            marginLeft: "10px",
                            fontFamily: "inherit"
                        }}>
                            {school_name}
                        </span>
                    </div>}
                </div>
            </CSidebarBrand>
            <CSidebarNav style={{ backgroundColor: "#EEF7FF", paddingLeft: "5px" }}>
                <CCreateElement
                    classname=""
                    items={navs}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle,
                    }}
                />
            </CSidebarNav>

        </CSidebar>
    );
};

export default React.memo(TheSidebar);
