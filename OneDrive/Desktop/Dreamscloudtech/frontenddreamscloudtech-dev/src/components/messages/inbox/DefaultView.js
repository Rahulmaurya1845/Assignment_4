import React from 'react'

function DefaultView() {
    return (
        <div>

            <div className="default__chat pt-1" style={{ backgroundColor: "#4aa7f9" }}>
                <div style={{ backgroundColor: "#4aa7f9", color: "white" }}>
                    <h2>Welcome , Admin </h2>
                    <h4>Messaging Chat system</h4>
                </div>
            </div>
            <div style={{ backgroundColor: "#eef7ff", height: "500px" }}>
            </div>
        </div>
    )
}

export default DefaultView
