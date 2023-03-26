import React from 'react';
import { Comic } from '../Comic';

// export type TPCollectionProps = {
//   data: [];
// };

const Collections = () => (
  <div className="flex justify-between gap-1 flex-wrap">
    <Comic
      img="https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg"
      title="Hawkeye & Black Canary"
      description="lorem ipsum doing the doings..."
    />
    <Comic
      img="https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg"
      title="Hawkeye & Black Canary"
      description="lorem ipsum doing the doings..."
    />
    <Comic
      img="https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg"
      title="Hawkeye & Black Canary"
      description="lorem ipsum doing the doings..."
    />
    <Comic
      img="https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg"
      title="Hawkeye & Black Canary"
      description="lorem ipsum doing the doings..."
    />
  </div>
);

export default Collections;
