import Stat from './Stat';

const StatsData = [
  {
    stat: '24+',
    text: 'Countries with collectors',
  },
  {
    stat: '1M',
    text: 'Comic books and counting',
  },
  {
    stat: '+95%',
    text: 'Countries with collectors',
  },
];

const Stats = () => (
  <section className="py-14 flex flex-col md:flex-row md:justify-center gap-8">
    {StatsData.map((stat, index) => (
      <Stat
        key={`${stat.stat}-${index + 1}`}
        stat={stat.stat}
        text={stat.text}
      />
    ))}
  </section>
);

export default Stats;
