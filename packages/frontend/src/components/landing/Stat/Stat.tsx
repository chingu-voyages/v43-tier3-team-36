type StatProps = {
  stat: string | number;
  text: string;
};

const Stat: React.FC<StatProps> = ({ stat, text }) => (
  <article className="py-14 px-8 lg:py-16 lg:px-20 border border-bordergray rounded-3xl text-center">
    <h3 className="text-5xl lg:text-[4rem] font-extrabold">{stat}</h3>
    <p className="my-4 text-base text-textgray">{text}</p>
  </article>
);

export default Stat;
