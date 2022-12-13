import 'jest-preset-angular/setup-jest';

const storageMock = () => {
  let storage: any = {};
  return {
    clear: () => (storage = {}),
    getItem: (key: string) => (key in storage ? storage[key] : null),
    removeItem: (key: string) => delete storage[key],
    setItem: (key: string, value: any) => (storage[key] = value || ''),
  };
};
Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      appearance: ['-webkit-appearance'],
      display: 'none',
      getPropertyValue: () => '',
    };
  },
});
Object.defineProperty(window, 'scrollTo', { value: jest.fn() });
