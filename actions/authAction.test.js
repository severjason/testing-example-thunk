import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from '../authActions';
import moxios from 'moxios';
import jwt_decode from 'jwt-decode';

describe('authActions test', () => {

	const mockStore = configureMockStore([thunk]);

	beforeEach(() => moxios.install());
	afterEach(() => moxios.uninstall());

	it('creates REGISTER_SUCCESS when register is successful', async (done) => {
		moxios.stubRequest('http://localhost:5000/users/register', {
			status: 201,
			response: {}
		});
		const expectedActions = [{type: 'REGISTER_SUCCESS'}];
		const store = mockStore({});
		await store.dispatch(actions.register('test'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates REGISTER_SUCCESS when register with errors', async (done) => {
		moxios.stubRequest('http://localhost:5000/users/register', {
			status: 400,
			response: 'error'
		});
		const expectedActions = [{type: 'GET_ERRORS', payload: 'error'}];
		const store = mockStore({});
		await store.dispatch(actions.register('test'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates SET_CURRENT_USER when login is successful', async (done) => {
		const mockedResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTM5MzkzMDIsImN1cnJlbnRVc2VyIjp7InVzZXJJZCI6MSwidXNlcm5hbWUiOiJydWtraWV5In0sImlhdCI6MTUxMzg1MjkwMn0.K2P7BAKDkMbk9avQznEE4u8PRtrx3P0mlSzLvFAdH2E';
		moxios.stubRequest('http://localhost:5000/users/auth', {
			status: 201,
			response: mockedResponse,
		});
		const expectedActions = [{type: 'SET_CURRENT_USER', payload: jwt_decode(mockedResponse)}];
		const store = mockStore({});
		await store.dispatch(actions.login('test'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates SET_CURRENT_USER when login with errors', async (done) => {
		moxios.stubRequest('http://localhost:5000/users/auth', {
			status: 400,
			response: 'error'
		});
		const expectedActions = [{type: 'GET_ERRORS', payload: 'error'}];
		const store = mockStore({});
		await store.dispatch(actions.login('test'))
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		done();
	});

	it('creates SET_CURRENT_USER on logout', async (done) => {
		const store = mockStore({});
		await store.dispatch(actions.logout());
		expect(store.getActions()).toEqual([{type: 'SET_CURRENT_USER', payload: {}}]);
		done();
	});

	it('creates SET_CURRENT_USER ', async (done) => {
		const expectedActions = [{type: 'SET_CURRENT_USER', payload: 'decoded'}];
		const store = mockStore({});
		await store.dispatch(actions.setCurrentUser('decoded'));
		expect(store.getActions()).toEqual(expectedActions);
		done();
	});
});