import React from 'react';
import Header from './Header';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactElement;
};

function PageLayout({children}: PageLayoutProps) {
  return (
    <>
      <Header />
      <div style={{padding: '64px 15vw'}}>{children}</div>
      <Footer />
    </>
  );
}

export default PageLayout;
