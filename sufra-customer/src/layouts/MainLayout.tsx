import type { ReactNode } from 'react'; // Add 'type' keyword
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode; // Now correctly typed
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="w-full flex flex-col items-center">
    <Header />
    {children}
    <Footer />
  </div>
);

export default MainLayout;