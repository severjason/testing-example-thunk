import React from 'react';
import ConnectedDataCard, { DataCard } from '../../data/DataCard';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('DataCard component', () => {

	const initialStore = {
		datas: {
			allData: [],
			data: {},
			loading: false,
			predictedData: null
		},
		deleteData: jest.fn(),
		predictData: jest.fn(),
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedDataCard renders without crashing', () => {
		expect(shallow(<ConnectedDataCard store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});

	const mockProps = {
		datas: {
			allData: [],
			data: {},
			loading: false,
			predictedData: null
		},
		data: {
			createdAt: "1995-12-25",
		},
		deleteData: jest.fn(),
		predictData: jest.fn(),
	};
	const wrapper = shallow(<DataCard {...mockProps} />);
	const instance = wrapper.instance();
	it('DataCard renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});

	const initialState = {
		predictedValue: null,
		predictArea: false,
		date: '',
		errors: ''
	};

	it('DataCard state equals initial state', () => {
		expect(instance.state).toEqual(initialState);
	});

	it('deleteData called on onDeleteClick', () => {
		instance.onDeleteClick('id');
		expect(mockProps.deleteData).toBeCalled();
	});

	it('showPredictArea chages state', () => {
		instance.showPredictArea();
		expect(instance.state.predictArea).toBeTruthy();
		instance.showPredictArea();
		expect(instance.state.predictArea).toBeFalsy();
	});

	it('handles onChange correctly', () => {
		const mockEvent = {
			target: {
				name: 'date',
				value: '2018-08-21'
			}
		};
		instance.onChange(mockEvent);
		expect(instance.state.date).toEqual('2018-08-21');
	});

	it('handles componentWillReceiveProps correctly', () => {
		const datas = {
			allData: [],
			data: {},
			loading: false,
			predictedData: {
				'Scored Labels': 'some data'
			}
		};
		wrapper.setProps({ datas });
		expect(instance.state.predictedValue).toEqual('some data');
		wrapper.setProps({ datas : null });
		expect(instance.state.predictedValue).toEqual('some data');
	});

	it('handles onPredict correctly', () => {
		instance.onPredict();
		instance.showPredictArea();
		expect(instance.state.errors).toEqual('Invalid date');
		expect(wrapper.find('div.invalid-feedback').length).toBe(1);

		instance.setState({date: '21-08-2018'});
		instance.onPredict();
		expect(instance.state.errors).toEqual("");
		expect(mockProps.predictData).toBeCalled();
		expect(wrapper.find('div.invalid-feedback').length).toBe(0);
	});

});
