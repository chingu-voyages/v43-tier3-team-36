import Navigation from '@/components/common/Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const ExploreLayout: React.FC<LayoutProps> = ({ children }) => (
  <main className="pt-8 lg:pt-9 px-4 lg:px-7 pb-9 lg:pb-10">
    <Navigation />
    {children}
  </main>
);

export default ExploreLayout;
