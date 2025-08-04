import type { ReactNode } from 'react'; // Add 'type' keyword
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="w-full flex flex-col items-center">
    <Header />
    {children}
    <Footer />
  </div>
);

export default MainLayout;