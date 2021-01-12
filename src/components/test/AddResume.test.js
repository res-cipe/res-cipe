import React from 'react';
import { render, fireEvent, waitFor, screen } from '../../test/test-util';
import '@testing-library/jest-dom/extend-expect';
import AddResume from '../AddResume';

describe('AddResume modal component', () => {
  const props = {};

  beforeEach(() => {
    props.isOpen = true;
    props.onClose = jest.fn().mockName('onClose');
  });

  it('should render to the page without crashing', () => {
    render(<AddResume {...props} />);
  });

  it('should be able to close the modal', () => {
    render(<AddResume {...props} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
