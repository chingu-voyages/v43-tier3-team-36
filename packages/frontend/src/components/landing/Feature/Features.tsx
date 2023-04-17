/* eslint-disable import/extensions */
import Collector from '@/assets/collector.png';
import Offers from '@/assets/offers.png';
import Comics from '@/assets/comics.png';
import Feature from './Feature';

const FeatureData = [
  {
    heading: 'Next level comic books for you',
    desc: 'Welcome to lorem ipsum biloti ni indemp your oluib to a whole new level! Our lorem ipsum loquitor dolor  sequi oui naedi lorem % ipsum and are loquitor on feino dolor mot.',
    thumbnail: Comics,
    alt: 'A group of comic images',
  },

  {
    heading: 'Comic offers to suit your taste',
    desc: 'Welcome to lorem ipsum biloti ni indemp your oluib to a whole new level! Our lorem ipsum loquitor dolor  sequi oui naedi lorem % ipsum and are loquitor on feino dolor mot.',
    thumbnail: Offers,
    alt: 'A list of comic offers',
  },

  {
    heading: 'Collectors from all round the world',
    desc: 'Welcome to lorem ipsum biloti ni indemp your oluib to a whole new level! Our lorem ipsum loquitor dolor  sequi oui naedi lorem % ipsum and are loquitor on feino dolor mot.',
    thumbnail: Collector,
    alt: 'A collector card',
  },
];

const Features = () => (
  <div className="py-14 lg:py-32 flex flex-col gap-24 lg:gap-52">
    {FeatureData.map((feature, index) => (
      <Feature
        key={`${feature.heading}-${index + +1}`}
        heading={feature.heading}
        desc={feature.desc}
        source={feature.thumbnail}
        altText={feature.alt}
        layoutAlt={index === 1}
      />
    ))}
  </div>
);

export default Features;
