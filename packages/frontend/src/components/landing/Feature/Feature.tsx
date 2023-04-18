import clsx from 'clsx';
import Illustration, { IllustrationProps } from '../Illustration';

type FeatureProps = {
  heading: string;
  desc: string;
  layoutAlt?: boolean;
} & IllustrationProps;

const Feature: React.FC<FeatureProps> = ({
  heading,
  desc,
  layoutAlt,
  source,
  altText,
}) => (
  <section className="md:flex md:gap-6">
    <article className={clsx('md:basis-1/2', { 'md:order-2': layoutAlt })}>
      <h2 className="text-3xl lg:text-5xl font-bold font-dmsans">{heading}</h2>
      <p className="mt-4 mb-8 text-base lg:text-lg text-textgray">{desc}</p>
    </article>
    <Illustration className="md:flex-1" source={source} altText={altText} />
  </section>
);

export default Feature;
