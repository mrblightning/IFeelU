import React from 'react';

const Page = ({ match }) => {

    return (
        <div className="pageContent" id="pageContent">
            <div className="pageTopText">
            {/*Page ID {match.params.id}*/}
            {match.params.id}
            </div>
        </div>
    )
}

export default Page