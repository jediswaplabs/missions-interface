import { Provider } from 'starknet';

export default function getLibrary(provider) {
  const library = new Provider(provider);
  return library;
}
