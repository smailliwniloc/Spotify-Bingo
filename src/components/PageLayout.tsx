import React from 'react'
import Header from './Header'
import Footer from './Footer'

type PageLayoutProps = {
    children: React.ReactElement
}

function PageLayout({children}: PageLayoutProps) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}

export default PageLayout