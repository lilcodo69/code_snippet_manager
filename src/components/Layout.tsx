

import React from 'react';

import NavBar from './NavBar'

type LayoutProps = {
  children: React.ReactNode;
};



const Layout = ({children}: LayoutProps)=>{
        return(

            <div className=''>
                <NavBar/>

            <main>
                {children}
            </main>


            </div>

        )

}


export default Layout