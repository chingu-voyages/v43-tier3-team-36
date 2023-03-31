import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

interface IOfferItem {
  comicName: string;
  imageUrl: string;
  issue: number;
  createdBy: string;
  createdOn: string;
  type: string;
}

export interface IOfferList extends IOfferItem {
  comicId: string;
}

interface IOfferItemProps extends IOfferItem {
  index: number;
}

export const OfferItem = ({
  index,
  comicName,
  imageUrl,
  issue,
  createdBy,
  createdOn,
  type,
}: IOfferItemProps) => (
  <article className="md:grid md:grid-cols-[minmax(0,_50px)_4fr_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)] md:items-center my-4 p-4 md:px-6 border rounded-xl hover:bg-gray-50 text-gray-800 font-medium">
    <div className="md:hidden text-sm flex justify-between">
      <div className="flex ">
        <span className="block mr-4">
          <img className="w-16 h-16 rounded-lg" src={imageUrl} alt="" />
        </span>
        <div className="flex flex-col">
          <span className="text-lg font-bold">{comicName}</span>
          <span className="font-medium text-gray-500">{`@${createdBy}`}</span>
        </div>
      </div>
      <div className="flex flex-col flex-shrink-0">
        <Chip
          className="w-fit text-xs font-light bg-red-200 border border-red-600"
          label={`Issue #${issue}`}
        />
        <span className="mt-1.5">{createdOn}</span>
      </div>
    </div>
    <div className="hidden md:block text-gray-500">{index}</div>
    <div className="hidden md:flex md:items-center">
      <img className="w-12 h-12 rounded-lg" src={imageUrl} alt="" />
      <span className="ml-4 text-lg font-bold">{comicName}</span>
    </div>
    <div className="hidden md:block">
      <Chip
        className="w-fit text-xs bg-red-300 border border-red-600 text-darkgrey"
        label={`Issue #${issue}`}
      />
    </div>
    <div className="hidden md:block">
      <span>{createdOn}</span>
    </div>
    <div className="hidden md:block">
      <span className="font-medium text-gray-500">{`@${createdBy}`}</span>
    </div>
    <div className=" mt-4 md:mt-0 text-sm flex">
      {type === 'exg' && (
        <Button className="w-fit ml-auto md:ml-0 uppercase">exg</Button>
      )}
      {type === 'sell' && (
        <Button className="w-fit ml-auto md:ml-0 uppercase">sell</Button>
      )}
    </div>
  </article>
);
