import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotification } from './useNotification';

describe('useNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return null notification initially', () => {
    const { result } = renderHook(() => useNotification());
    expect(result.current.notification).toBeNull();
  });

  it('should show notification with default info type', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('Test message');
    });

    expect(result.current.notification).toEqual({
      message: 'Test message',
      type: 'info'
    });
  });

  it('should show notification with custom type', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('Success message', 'success');
    });

    expect(result.current.notification).toEqual({
      message: 'Success message',
      type: 'success'
    });
  });

  it('should hide notification manually', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('Test message');
    });

    expect(result.current.notification).not.toBeNull();

    act(() => {
      result.current.hideNotification();
    });

    expect(result.current.notification).toBeNull();
  });

  it('should auto-hide notification after 3 seconds', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('Test message');
    });

    expect(result.current.notification).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.notification).toBeNull();
  });

  it('should reset timer when showing a new notification', () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('First message');
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.showNotification('Second message');
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // If it didn't reset, it would be null now because 2000 + 2000 > 3000
    expect(result.current.notification).toEqual({
      message: 'Second message',
      type: 'info'
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.notification).toBeNull();
  });

  it('should clear timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { result, unmount } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification('Test message');
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
