import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from '../dataActions';
import moxios from 'moxios';


describe('dataActions test', () => {

	const mockStore = configureMockStore([thunk]);

	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());

	it('creates successful ADD_DATA ', async (done) => {
		moxios.stubRequest('http://localhost:5000/data', {
			status: 201,
			response: 'some data'
		});
		const expectedActions = [
			{type: 'CLEAR_ERRORS'},
			{type: 'ADD_DATA', payload: 'some data'}
		];
		const store = mockStore({});
		const mockHistory = {
			push: jest.fn()
		};
		await store.dispatch(actions.addData('some data', mockHistory))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates ADD_DATA with errors ', async (done) => {
		moxios.stubRequest('http://localhost:5000/data', {
			status: 404,
			response: 'error'
		});
		const expectedActions = [
			{type: 'CLEAR_ERRORS'},
			{type: 'GET_ERRORS', payload: 'error'}
		];
		const store = mockStore({});
		const mockHistory = {
			push: jest.fn()
		};
		await store.dispatch(actions.addData('some data', mockHistory))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates successful GET_ALL_DATA ', async (done) => {
		moxios.stubRequest('http://localhost:5000/data', {
			status: 201,
			response: 'some data'
		});
		const expectedActions = [
			{type: 'DATA_LOADING'},
			{type: 'GET_ALL_DATA', payload: 'some data'}
		];
		const store = mockStore({});
		await store.dispatch(actions.getAllData())
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates GET_ALL_DATA with errors', async (done) => {
		moxios.stubRequest('http://localhost:5000/data', {
			status: 404,
			response: {}
		});
		const expectedActions = [
			{type: 'DATA_LOADING'},
			{type: 'GET_ALL_DATA', payload: null}
		];
		const store = mockStore({});
		await store.dispatch(actions.getAllData())
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates successful GET_DATA ', async (done) => {
		const id = 11;
		moxios.stubRequest(`http://localhost:5000/data/${id}`, {
			status: 201,
			response: 'some data'
		});
		const expectedActions = [
			{type: 'DATA_LOADING'},
			{type: 'GET_DATA', payload: 'some data'}
		];
		const store = mockStore({});
		await store.dispatch(actions.getData(id))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates GET_DATA with errors', async (done) => {
		const id = 11;
		moxios.stubRequest(`http://localhost:5000/data/${id}`, {
			status: 404,
			response: {}
		});
		const expectedActions = [
			{type: 'DATA_LOADING'},
			{type: 'GET_DATA', payload: null}
		];
		const store = mockStore({});
		await store.dispatch(actions.getData(id))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates successful DELETE_DATA ', async (done) => {
		const id = 22;
		moxios.stubRequest(`http://localhost:5000/data/${id}`, {
			status: 201,
			response: id
		});
		const expectedActions = [
			{type: 'DELETE_DATA', payload: id}
		];
		const store = mockStore({});
		await store.dispatch(actions.deleteData(id))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates DELETE_DATA with errors', async (done) => {
		const id = 22;
		moxios.stubRequest(`http://localhost:5000/data/${id}`, {
			status: 404,
			response: 'error'
		});
		const expectedActions = [
			{type: 'GET_ERRORS', payload: 'error'}
		];
		const store = mockStore({});
		await store.dispatch(actions.deleteData(id))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates successful GET_PREDICTED_DATA', async (done) => {
		const response = '{"Results":{"output1":["some data"]}}';
		moxios.stubRequest('http://localhost:5000/data/predict', {
			status: 200,
			response: JSON.stringify(response)
		});
		const expectedActions = [
			{type: 'GET_PREDICTED_DATA', payload: "some data"}
		];
		const store = mockStore({});
		await store.dispatch(actions.predictData('data'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates GET_PREDICTED_DATA with error', async (done) => {
		moxios.stubRequest('http://localhost:5000/data/predict', {
			status: 404,
			response: {}
		});
		const expectedActions = [];
		const store = mockStore({});
		await store.dispatch(actions.predictData('data'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});
});