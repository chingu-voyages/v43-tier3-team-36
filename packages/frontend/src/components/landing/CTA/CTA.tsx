/* eslint-disable import/extensions */
import { Button } from '@/components/ui';
import CTAListItem from './CTAListItem';
import Illustration from '../Illustration';
import Collection from '@/assets/collection.png';

type CTAProps = {
  heading: string;
};

const CTAListData = [
  {
    desc: 'The best comic book varieties',
  },
  {
    desc: 'Distinct offers to suit your taste',
  },
  {
    desc: 'No limits. Connect to the world',
  },
];

const CTA: React.FC<CTAProps> = ({ heading }) => (
  <section className="py-14 lg:py-28 flex flex-col md:flex-row gap-10">
    <div className="md:basis-1/2 flex flex-col gap-8">
      <div>
        <h2 className="text-3xl lg:text-5xl font-bold font-dmsans">
          {heading}
        </h2>
      </div>
      <div>
        <ul className="flex flex-col gap-4">
          {CTAListData.map((item, index) => (
            <CTAListItem key={`${index + 1}`} desc={item.desc} />
          ))}
        </ul>
      </div>
      <div>
        <Button className="w-full text-sm rounded-full">Trade now</Button>
      </div>
    </div>
    <Illustration
      className="md:flex-1"
      source={Collection}
      altText="A collection of comic books"
    />
  </section>
);

export default CTA;
