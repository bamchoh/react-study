import * as React from 'react';
import { shallow } from 'enzyme';
import { Rect } from './Rect';

test('Rect changes the text after click', () => {
	const rect = shallow(<Rect num={1} bgcolor="#ff0000" />);

	expect(rect.text()).toEqual('Hello 1');
	rect.find('button').simulate('click');
	expect(rect.text()).toEqual('Hello 2');

	expect(rect).toMatchSnapshot();
});
