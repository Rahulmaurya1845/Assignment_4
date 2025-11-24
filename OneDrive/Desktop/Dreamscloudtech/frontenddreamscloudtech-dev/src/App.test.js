import React from 'react';
import { shallow } from 'enzyme/build';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({}); // Add initial state if needed

it('mounts App without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
  wrapper.unmount();
});


