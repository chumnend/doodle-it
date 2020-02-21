import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe("APP COMPONENT", function () {
    test("expects to render a component", function () {
        const { container, getByText } = render(<App />);
        expect(getByText('MERN React Template')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });  
});
