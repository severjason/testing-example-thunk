import React from 'react';
import ConnectedMyData, { MyData } from '../../data/MyData';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('MyData component', () => {

	const initialStore = {
		data: {
			allData: [],
			loading: false
		},
		getAllData: jest.fn(),
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedMyData renders without crashing', () => {
		expect(shallow(<ConnectedMyData store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});

	const mockProps = {
		data: {
			allData: [],
			loading: false
		},
		getAllData: jest.fn(),
	};
	const wrapper = shallow(<MyData {...mockProps} />);
	it('MyData renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('MyData contains DataInfo if allData !== null', () => {
		expect(wrapper.find('DataInfo').length).toBe(1);
		expect(wrapper.find('Loading').length).toBe(0);
	});

	it('MyData contains DataInfo if allData === null', () => {
		const newMockProps = {
			data: {
				allData: null,
				loading: true
			},
			getAllData: jest.fn(),
		};
		const newWrapper = shallow(<MyData {...newMockProps} />);
		expect(newWrapper.find('DataInfo').length).toBe(0);
		expect(newWrapper.find('Loading').length).toBe(1);
	});
});
