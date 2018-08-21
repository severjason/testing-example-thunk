import React from 'react';
import ConnectedLogin, { Login } from '../../auth/Login';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';


describe('Login component', () => {
	const initialStore = {
		auth: {
			isAuthenticated: false,
			isRegisterSuccess: false,
			user: {}
		},
		errors: {},
		login: jest.fn(),
		history: {
			push: jest.fn(),
		}
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedLogin renders without crashing', () => {
		expect(shallow(<ConnectedLogin store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});


	const mockProps = {
		auth: {
			isAuthenticated: true,
			isRegisterSuccess: false,
			user: 'testUser'
		},
		errors: {},
		login: jest.fn(),
		history: {
			push: jest.fn(),
		}
	};

	it('Login renders without crashing', () => {
		const mockWithoutUser = {
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: false,
				user: {}
			},
			errors: {},
			login: jest.fn(),
			history: {
				push: jest.fn(),
			}
		};
		expect(shallow(<Login {...mockWithoutUser} />)).toMatchSnapshot();
	});

	const wrapper = shallow(<Login {...mockProps} />);
	const instance = wrapper.instance();

	it('Login renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
		expect(mockProps.history.push).toBeCalledWith("/data");
	});

	const initialState = {
		email: '',
		password: '',
		errors: {}
	};

	it('Login state equals initial state', () => {
		expect(instance.state).toEqual(initialState);
	});

	it('handles componentWillReceiveProps correctly', () => {
		wrapper.setProps({
			auth: {
				isAuthenticated: true,
				isRegisterSuccess: false,
				user: 'user'
			},
			errors: null,
		});
		expect(mockProps.history.push).toHaveBeenCalledTimes(2);
		expect(instance.state.errors).toEqual({});

		wrapper.setProps({
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: false,
				user: {}
			},
			errors: {
				password: 'error',
				email: 'error'
			},
		});
		expect(mockProps.history.push).toHaveBeenCalledTimes(2);
		expect(instance.state.errors).toEqual({
			password: 'error',
			email: 'error'
		});
		expect(wrapper.find('div.invalid-feedback').length).toBe(2);
	});

	it('handles onSubmit correctly', () => {
		wrapper.setProps({
			errors: {}
		});
		const mockEvent = {
			preventDefault: jest.fn(),
		};
		const testData = {
			email: 'test@gmail.com',
			password: '1234',
		};
		wrapper.setState({
			email: testData.email,
			password: testData.password,
		});
		instance.onSubmit(mockEvent);
		expect(instance.state.errors).toEqual({});
		expect(mockProps.login).toBeCalledWith(testData);
	});

	it('handles onChange correctly', () => {
		const mockEvent = {
			target: {
				name: 'email',
				value: 'newemail@gmail.com'
			}
		};
		instance.onChange(mockEvent);
		expect(instance.state.email).toEqual(mockEvent.target.value);
	});


});