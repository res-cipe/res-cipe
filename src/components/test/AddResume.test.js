import React from 'react';
import { render, fireEvent, waitFor, screen } from '../../test/test-util';
import '@testing-library/jest-dom/extend-expect';
import AddResume from '../AddResume';

describe('AddResume modal component', () => {
  const props = {};

  beforeEach(() => {});

  it('should render to the page without crashing', () => {
    render(<AddResume {...props} />);
  });
});
