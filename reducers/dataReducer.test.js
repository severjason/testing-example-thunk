import dataReducer from '../dataReducer';

const initialState = {
	allData: [],
	data: {},
	loading: false,
	predictedData: null
};

describe('dataReducer test', () => {
	it('should return the initial state', () => {
		expect(dataReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle DATA_LOADING', () => {
		expect(dataReducer(initialState, {
			type: 'DATA_LOADING',
		})).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle GET_ALL_DATA', () => {
		expect(dataReducer(initialState, {
			type: 'GET_ALL_DATA',
			payload: ['test', 'data'],
		})).toEqual({
			...initialState,
			allData: ['test', 'data'],
		});
	});

	it('should handle GET_DATA', () => {
		expect(dataReducer(initialState, {
			type: 'GET_DATA',
			payload: {data: 'some data'},
		})).toEqual({
			...initialState,
			data: {data: 'some data'},
		});
	});

	it('should handle ADD_DATA', () => {
		const stateAddData = {
			...initialState,
			allData: ['one', 'two']
		};
		expect(dataReducer(stateAddData, {
			type: 'ADD_DATA',
			payload: 'test data',
		})).toEqual({
			...stateAddData,
			allData: ['test data', 'one', 'two'],
		});
	});

	it('should handle GET_PREDICTED_DATA', () => {
		expect(dataReducer(initialState, {
			type: 'GET_PREDICTED_DATA',
			payload: 'predicted data',
		})).toEqual({
			...initialState,
			predictedData: 'predicted data',
		});
	});

	it('should handle DELETE_DATA', () => {
		const stateDeleteData = {
			...initialState,
			allData: [{_id: 24, data: 'test'}, {_id: 231, data: 'test'}],
		};
		expect(dataReducer(stateDeleteData, {
			type: 'DELETE_DATA',
			payload: 24,
		})).toEqual({
			...stateDeleteData,
			allData: [{_id: 231, data: 'test'}],
		});
	});

});