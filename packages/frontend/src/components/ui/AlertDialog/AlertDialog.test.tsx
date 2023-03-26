import { render } from 'test-utils';

import { AlertDialog } from './AlertDialog';
import { Button } from '../Button';

const MockButton = () => <Button>Cancel</Button>;

describe('<AlertDialog />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <AlertDialog
          title="Foo"
          actions={[MockButton]}
          open
          onClose={() => {}}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
