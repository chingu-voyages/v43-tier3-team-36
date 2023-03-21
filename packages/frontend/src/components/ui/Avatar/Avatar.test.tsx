import { render } from 'test-utils';

import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Avatar src="/" alt="Foo" />);
      expect(container).toMatchSnapshot();
    });
  });
});
