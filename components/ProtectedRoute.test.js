import React from 'react';
import ConnectedRoute, { ProtectedRoute } from '../ProtectedRoute';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import configureStore from 'redux-mock-store';

describe('ProtectedRoute test', () => {

	const initialStore = {
		auth: {
			isAuthenticated: false,
			isRegisterSuccess: false,
			user: {}
		},
	};

	const mockStore = configureStore([thunk]);
	it('ConnectedRoute renders without crashing', () => {
		expect(shallow(<ConnectedRoute store={mockStore(initialStore)}/>)).toMatchSnapshot();
	});

	const mockProps = {
		auth: {
			isAuthenticated: true,
			isRegisterSuccess: false,
			user: 'test',
		}
	};

	it('ProtectedRoute renders correctly if user authenticated', () => {
		const TestComponent = () => {
		};
		const wrapper = shallow(<ProtectedRoute {...mockProps} component={TestComponent}/>);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.props().render().type).toBe(TestComponent);
	});

	it('ProtectedRoute renders correctly if user not authenticated', () => {
		const mockProps2 = {
			auth: {
				isAuthenticated: false,
				isRegisterSuccess: false,
				user: {},
			}
		};
		const wrapper = shallow(<ProtectedRoute {...mockProps2}/>);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.props().render().type).toBe(Redirect);
	});

});