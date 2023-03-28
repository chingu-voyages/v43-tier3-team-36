import { render } from 'test-utils';

import { Chip } from './Chip';

describe('<Chip/>', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Chip label="Foo" />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with large prop', () => {
      const { container } = render(<Chip label="Foo" large />);
      expect(container).toMatchSnapshot();
    });
  });
});
