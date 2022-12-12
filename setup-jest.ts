import 'jest-preset-angular/setup-jest';

const storageMock = () => {
  let storage: any = {};
  return {
    // tslint:disable-next-line: no-dynamic-delete
    clear: () => (storage = {}),
    getItem: (key: string) => (key in storage ? storage[key] : null),
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
