/* eslint-disable import/extensions */
import Image from 'next/image';
import LogoInvert from '@/assets/logo-invert.svg';

const Footer = () => (
  <section className="flex-flex-col gap-14 mt-14 lg:mt-20 px-4 lg:px-10 pt-10 text-white bg-black">
    <article>
      <Image src={LogoInvert} alt="app-logo" />
    </article>
    <article className="mt-14 py-10 border-t border-white">
      <p className="text-sm text-center md:text-left">
        2023. © MCollector Technologies Inc.
      </p>
    </article>
  </section>
);

export default Footer;
