import { render } from 'test-utils';

import { Modal } from './Modal';

describe('<Modal />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <Modal title="Foo" open onClose={() => {}}>
          Hello, World
        </Modal>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
