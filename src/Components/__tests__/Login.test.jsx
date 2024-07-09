import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import { describe, beforeEach, test, vi, expect } from 'vitest';
import { handleSubmit, validateForm } from './MyComponent';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

vi.mock('./MyComponent', () => ({
  ...vi.importActual('./MyComponent'),
  validateForm: vi.fn(),
}));

describe('handleSubmit', () => {
  let state;
  let setState;
  let errors;
  let setErrors;
  let resMessage;
  let setReaponceMsg;
  let navigate;

  beforeEach(() => {
    state = { UserName: '', password: '' };
    setState = vi.fn(newState => {
      state = newState;
    });
    errors = { UserName: '', password: '' };
    setErrors = vi.fn(newErrors => {
      errors = newErrors;
    });
    resMessage = { open: false, msg: '' };
    setReaponceMsg = vi.fn(newMessage => {
      resMessage = newMessage;
    });
    navigate = vi.fn();
    vi.spyOn(window.localStorage.__proto__, 'setItem');
  });

  const renderUseState = () => {
    renderHook(() => {
      const [stateValue, setStateValue] = useState(state);
      const [errorsValue, setErrorsValue] = useState(errors);
      const [resMessageValue, setReaponceMsgValue] = useState(resMessage);
      setState = setStateValue;
      setErrors = setErrorsValue;
      setReaponceMsg = setReaponceMsgValue;
      navigate = useNavigate();
      return handleSubmit;
    });
  };

  test('should not call navigate or setItem if validateForm returns false', () => {
    validateForm.mockReturnValue(false);
    renderUseState();
    act(() => handleSubmit());
    expect(setErrors).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  test('should set error if validateForm returns true but UserName or password is incorrect', () => {
    validateForm.mockReturnValue(true);
    state = { UserName: 'wrong', password: 'wrong' };
    renderUseState();
    act(() => handleSubmit());
    expect(setErrors).toHaveBeenCalledWith({
      ...errors,
      invalidUserNamePassword: '',
    });
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  test('should set localStorage and navigate if UserName and password are correct', () => {
    validateForm.mockReturnValue(true);
    state = { UserName: 'roc', password: 'roc' };
    renderUseState();
    act(() => handleSubmit());
    expect(setErrors).toHaveBeenCalledWith({
      ...errors,
      invalidUserNamePassword: '',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('Authenticated', true);
    expect(setReaponceMsg).toHaveBeenCalledWith({
      ...resMessage,
      open: true,
      msg: 'Login Success',
    });
    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });
});
