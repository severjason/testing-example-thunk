import React from 'react';
import Loading from '../Loading';
import { shallow } from 'enzyme';

describe('Loading component', () => {
	it('Loading renders without crashing', () => {
		expect(shallow(<Loading />)).toMatchSnapshot();
	})
});
