export type Constructor<T = unknown> = new (...args: any[]) => T;
export type ConstructorBase = Constructor<{}>;
export type AbstractConstructor<T = unknown> = abstract new (...args: any[]) => T;
