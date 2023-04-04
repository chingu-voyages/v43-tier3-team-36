import { render } from 'test-utils';

import { Modal } from './Modal';

describe('<Modal />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<Modal title="Foo">Hello, World</Modal>);
      expect(container).toMatchSnapshot();
    });
  });
});
