import { fetchApi, isList } from './api.mjs';
const getPackages = id => fetchApi(`/api/ship/packages/${id}`, isList);
export default getPackages;
