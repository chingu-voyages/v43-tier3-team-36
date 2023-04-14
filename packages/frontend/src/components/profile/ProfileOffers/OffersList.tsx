import { useQuery } from '@tanstack/react-query';
import { getCurrentUserDetails } from '@/api';
import Offers from '@/components/explore/ExploreOffers/Offers';

const OffersList = () => {
  const { data: userData } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
  });

  //   @ts-ignore
  if (userData?.tradeOfferDetail?.length === 0) {
    return <p>No available offers</p>;
  }

  //   @ts-ignore
  return <Offers offers={userData?.tradeOfferDetail} onProfile />;
};

export default OffersList;
