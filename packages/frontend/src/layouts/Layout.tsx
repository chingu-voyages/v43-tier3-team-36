/* eslint-disable react/jsx-props-no-spreading */
import AlertLayout from './AlertLayout';
import { SEO, type SEOProps } from './SEO';

type LayoutProps = {
  children: React.ReactNode;
  seo: SEOProps;
};

const Layout: React.FC<LayoutProps> = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <div className="min-h-screen">
      <AlertLayout>{children}</AlertLayout>
    </div>
  </>
);

export default Layout;
