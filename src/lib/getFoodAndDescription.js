import { fetchApi, isList } from './api.mjs';
const getFoodAndDescription = id => fetchApi(`/api/package/description/${id}`, isList);
export default getFoodAndDescription;
