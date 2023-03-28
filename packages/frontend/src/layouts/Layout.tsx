/* eslint-disable react/jsx-props-no-spreading */
import AlertPopup from '@/components/common/AlertPopup/AlertPopup';
import { SEO, type SEOProps } from './SEO';

type LayoutProps = {
  children: React.ReactNode;
  seo: SEOProps;
};

const Layout: React.FC<LayoutProps> = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <div className="min-h-screen">
      <AlertPopup />
      {children}
    </div>
  </>
);

export default Layout;
