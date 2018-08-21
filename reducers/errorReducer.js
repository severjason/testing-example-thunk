import errorReducer from '../errorReducer';

const initialState = {};

describe('errorReducer test', () => {
	it('should return the initial state', () => {
		expect(errorReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle GET_ERRORS', () => {
		expect(errorReducer(initialState, {
			type: 'GET_ERRORS',
			payload: 'some errors',
		})).toEqual('some errors');
	});

	it('should handle GET_ERRORS', () => {
		expect(errorReducer(initialState, {
			type: 'GET_ERRORS',
			payload: {
				errors: 'error'
			},
		})).toEqual({errors: 'error'});
	});

	it('should handle CLEAR_ERRORS', () => {
		expect(errorReducer(initialState, {type: 'CLEAR_ERRORS'})).toEqual({});
	});


});