import React from 'react';


/**
 * Creation of the loader
 * @component
 * @returns {JSX.Element} loader component
 */
const Loader = () => {
    return (
        <div className={["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};

export default Loader;