import React from 'react';
import DataInfo from '../../data/DataInfo';
import { shallow } from 'enzyme';

describe('DataInfo component', () => {
	const mockProps = {
		allData: [
			{
				_id: 12,
				data: 'test',
			},
			{
				_id: 23,
				data: 'test',
			}
		]
	};

	it('DataInfo renders without crashing', () => {
		expect(shallow(<DataInfo {...mockProps} />)).toMatchSnapshot();
	})
});
