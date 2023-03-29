import React from "react";

const Navbar = () => {

    return (
        <div data-cy='header-title' className="h-[105px] w-screen bg-[#16ABF8] absolute shadow">
            <div className="2xl:w-3/4 h-[105px] mx-auto flex">
                <p className="my-auto pl-[220px] text-[24px] font-bold text-white">TO DO LIST APP</p>
            </div>
        </div>
    )
};

export default Navbar;