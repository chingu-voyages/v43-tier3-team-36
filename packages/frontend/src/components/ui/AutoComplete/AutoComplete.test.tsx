import { render } from 'test-utils';

import { AutoComplete } from './AutoComplete';

type MockObject = {
  id: number;
  val: string;
  text: string;
};

const MOCK_DATA: MockObject[] = [
  {
    id: 0,
    val: 'foo',
    text: 'Foo',
  },
  {
    id: 1,
    val: 'bar',
    text: 'Bar',
  },
  {
    id: 2,
    val: 'baz',
    text: 'Baz',
  },
];

describe('<AutoComplete />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <AutoComplete
          data={MOCK_DATA}
          optionKeys={{ key: 'id', value: 'val', label: 'text' }}
          onSelect={() => {}}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
