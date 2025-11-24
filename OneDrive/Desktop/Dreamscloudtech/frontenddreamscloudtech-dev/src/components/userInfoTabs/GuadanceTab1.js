import React from 'react';
import GuadianCard from '../../AdminComponents/shared/GuadianCard1'

function GuadanceTab({ user }) {
    console.log(user, "guadance tab")
    return (
        <div className="row" >
            {user?.length > 0 ? user.map(e => {
                return (
                    <div className="col-6">
                        <GuadianCard guadian={e} key={e._id} noEdit={true} />
                    </div>
                )
            }) : <div>No guadian info</div>}
        </div>
    )
}

export default GuadanceTab

