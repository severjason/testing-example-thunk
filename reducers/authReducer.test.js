import authReducer from '../authReducer';

const initialState = {
	isAuthenticated: false,
	isRegisterSuccess: false,
	user: {}
};

describe('authReducer test', () => {
	it('should return the initial state', () => {
		expect(authReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle REGISTER_SUCCESS', () => {
		expect(authReducer(initialState, {type: 'REGISTER_SUCCESS'})).toEqual({
			...initialState,
			isRegisterSuccess: true,
		});
	});

	it('should handle SET_CURRENT_USER', () => {
		expect(authReducer(initialState, {
			type: 'SET_CURRENT_USER',
			payload: 'testUser'
		})).toEqual({
			...initialState,
			isAuthenticated: true,
			user: 'testUser',
		});
	});


});