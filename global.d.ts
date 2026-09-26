declare module '*.css';

interface IReactNativeFormDataFile {
  uri: string;
  name: string;
  type: string;
}

interface FormData {
  append(name: string, value: IReactNativeFormDataFile): void;
}
