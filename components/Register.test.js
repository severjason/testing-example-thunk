import React from 'react';
import ConnectedRegister, { Register } from '../../auth/Register';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('Register component', () => {
	const initialStore = {
		auth: {
			isAuthenticated: false,
			isRegisterSuccess: false,
			user: {}
		},
		errors: {},
		register: jest.fn(),
		history: {
			push: jest.fn(),
		}
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedRegister renders without crashing', () => {
		expect(shallow(<ConnectedRegister store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});


	const mockProps = {
		auth: {
			isAuthenticated: true,
			isRegisterSuccess: true,
			user: 'testUser'
		},
		errors: null,
		register: jest.fn(),
		history: {
			push: jest.fn(),
		}
	};

	it('Register renders without crashing', () => {
		const mockWithoutUser = {
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: false,
				user: {}
			},
			errors: {},
			register: jest.fn(),
			history: {
				push: jest.fn(),
			}
		};
		expect(shallow(<Register {...mockWithoutUser} />)).toMatchSnapshot();
	});

	const wrapper = shallow(<Register {...mockProps} />);
	const instance = wrapper.instance();

	it('Register renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
		expect(mockProps.history.push).toBeCalledWith("/");
	});

	const initialState = {
		fristName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	it('Register state equals initial state', () => {
		expect(instance.state).toEqual(initialState);
	});

	it('handles componentWillReceiveProps correctly', () => {
		wrapper.setProps({
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: true,
				user: 'user'
			},
			errors: null,
		});
		expect(mockProps.history.push).toHaveBeenCalledTimes(2);
		expect(instance.state.errors).toEqual({});

		const testErrors = {
			fristName: 'error',
			lastName: 'error',
			email: 'error',
			password: 'error',
			password2: 'error',
		};

		wrapper.setProps({
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: false,
				user: {}
			},
			errors: testErrors,
		});
		expect(mockProps.history.push).toHaveBeenCalledTimes(2);
		expect(instance.state.errors).toEqual(testErrors);
		expect(wrapper.find('div.invalid-feedback').length).toBe(5);
	});

	it('handles onSubmit correctly', () => {
		wrapper.setProps({
			errors: {}
		});
		const mockEvent = {
			preventDefault: jest.fn(),
		};
		const testData = {
			fristName: 'name',
			lastName: 'lastName',
			email: 'test@gmail.com',
			password: "123",
			password2: "123"
		};
		wrapper.setState({
			fristName: testData.fristName,
			lastName: testData.lastName,
			email: testData.email,
			password: testData.password,
			password2: testData.password2,
		});
		instance.onSubmit(mockEvent);
		expect(instance.state.errors).toEqual({});
		expect(mockProps.register).toBeCalledWith(testData);
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