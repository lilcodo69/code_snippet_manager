

import React from 'react';

import NavBar from './NavBar'

type LayoutProps = {
  children: React.ReactNode;
};



const Layout = ({children}: LayoutProps)=>{
        return(

            <div className='flex flex-col bg-indigo-400 ' >
    <div className=''>
                <NavBar/>

            <main>
                {children}
            </main>
            </div>
           


            </div>

        )

}


export default Layout