import { Check } from 'lucide-react';

type CTAListItemProps = {
  desc: string;
};

const CTAListItem: React.FC<CTAListItemProps> = ({ desc }) => (
  <li className="flex items-center gap-2">
    <span>
      <Check className="text-textgray" />
    </span>
    <span className="text-base lg:text-lg text-textgray">{desc}</span>
  </li>
);

export default CTAListItem;
