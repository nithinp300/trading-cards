import React from 'react';
import { shallow } from 'enzyme';
import PaginationBar from '../PaginationBar';

describe('PaginationBar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PaginationBar />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will 
    // generate a snapshot file automatically.
  });
});