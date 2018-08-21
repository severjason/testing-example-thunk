import React from 'react';
import ConnectedPostData, { PostData } from '../../data/PostData';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('PostData component', () => {

	const initialStore = {
		errors: {},
		addData: jest.fn(),
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedPostData renders without crashing', () => {
		expect(shallow(<ConnectedPostData store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});

	const mockProps = {
		errors: {},
		addData: jest.fn(),
		history: '',
	};
	const wrapper = shallow(<PostData {...mockProps} />);
	const instance = wrapper.instance();
	it('PostData renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('handles onChange correctly', () => {
		const mockEvent = {
			target: {
				name: 'pressure',
				value: '765'
			}
		};
		instance.onChange(mockEvent);
		expect(instance.state.pressure).toEqual('765');
	});

	it('handles onSubmit correctly', () => {
		const mockEvent = {
			preventDefault: jest.fn(),
		};
		instance.onSubmit(mockEvent);
		expect(instance.state.errors).not.toEqual({});
		instance.setState({
			humidity: 50,
			pressure: 1000,
			dewPoint: 50,
			cloudCover: 50,
			windBearing: 200,
			windSpeed: 20,
			visibility: 20,
			uvIndex: 5,
		});
		instance.onSubmit(mockEvent);
		expect(mockProps.addData).toBeCalled();
	});
});
