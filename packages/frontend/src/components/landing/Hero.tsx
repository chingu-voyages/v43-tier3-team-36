import Link from 'next/link';
import Illustration from './Illustration';
import { Button } from '../ui';
// eslint-disable-next-line import/extensions
import HeroImg from '@/assets/hero.png';

type HeroProps = {
  label: string;
  headline: string;
  uspText: string;
};

const Hero: React.FC<HeroProps> = ({ label, headline, uspText }) => (
  <section className="font-dmsans flex flex-col md:flex-row gap-8 lg:gap-12 py-14 lg:py-48">
    <Illustration className="md:flex-1" source={HeroImg} altText="" priority />
    <div className="md:basis-1/2">
      <div className="flex flex-col gap-2">
        <small className="text-sm">{label}</small>
        <h1 className="text-4xl lg:text-6xl font-bold font-dmsans">
          {headline}
        </h1>
      </div>
      <div className="mt-4 mb-6">
        <p className="text-base lg:text-lg text-textgray">{uspText}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link href="explore">
          <Button className="w-full py-2.5 text-sm rounded-full">
            Trade now
          </Button>
        </Link>
        <Link href="signup">
          <Button className="w-full py-2.5 text-sm text-black border border-black bg-white rounded-full">
            Explore
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
