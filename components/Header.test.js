import React from 'react';
import ConnectedHeader, { Header } from '../Header';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('Header test', () => {

	const initialStore = {
		auth: {
			isAuthenticated: false,
			isRegisterSuccess: false,
			user: {}
		},
		logout: jest.fn(),
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedHeader renders without crashing', () => {
		expect(shallow(<ConnectedHeader store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});

	const mockPropsWithoutUser = {
		auth: {
			isAuthenticated: false,
			isRegisterSuccess: false,
			user: {}
		},
	};


	it('Header component renders without crashing with not authenticated user', () => {
		expect(shallow(<Header {...mockPropsWithoutUser} />)).toMatchSnapshot();
	});

	const mockProps = {
		auth: {
			isAuthenticated: true,
			isRegisterSuccess: false,
			user: 'test',
		}
	};

	const mockLogout = jest.fn();

	const wrapper = shallow(<Header {...mockProps} logout={mockLogout}/>);

	it('Header component renders without crashing with authenticated user', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Header component calls logout', () => {
		const e = { preventDefault: () => jest.fn() };
		expect(wrapper.find('a.nav-link').length).toBe(1);
		wrapper.find('a.nav-link').simulate('click', e);
		expect(mockLogout).toBeCalled();
	});

});