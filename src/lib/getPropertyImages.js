import { fetchApi, isList } from './api.mjs';
export const getPropertyImages = id => fetchApi(`/api/propertyImages/${id}`, isList);
