import { render } from 'test-utils';

import { ListSelect, ListSelectOption } from './ListSelect';

const MOCK_DATA = [
  {
    id: 0,
    value: 69,
    label: 'Foo',
  },
  {
    id: 1,
    value: 420,
    label: 'Bar',
  },
  {
    id: 2,
    value: 21,
    label: 'Baz',
  },
];

describe('<ListSelect />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <ListSelect data={MOCK_DATA} labelKey="title" btnStyles="">
          {MOCK_DATA.map((data) => (
            <ListSelectOption key={data.id} value={data}>
              {data.label}
            </ListSelectOption>
          ))}
        </ListSelect>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
