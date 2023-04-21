import { Footer, Nav } from '@/components/landing';

type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => (
  <main>
    <div className="max-w-[1400px] w-full mx-auto">
      <Nav />
    </div>
    <div className="max-w-[1240px] w-full mx-auto px-4">{children}</div>
    <div className="max-w-[1400px] w-full mx-auto">
      <Footer />
    </div>
  </main>
);

export default LandingLayout;
