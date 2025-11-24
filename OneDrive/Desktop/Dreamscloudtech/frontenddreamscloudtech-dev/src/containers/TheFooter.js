import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
    let year = new Date();

    return (

        <CFooter fixed={false} style={{ backgroundColor: "#ffffff ", fontFamily: "poppins", fontSize: "0.9rem" }}>
            <p className="text-center  w-100 mt-3">
                © 2020 - {year.getFullYear()} Dreams CloudTech PVT Ltd. All Rights
                Reserved.
            </p>
        </CFooter>
    );
};

export default React.memo(TheFooter);