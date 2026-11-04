import { fetchApi, isSchedules } from './api.mjs';
const getSchedules = async id => {
  const data = await fetchApi(`/api/schedules/upcoming/${id}`, value => (Array.isArray(value) && value.length === 0) || isSchedules(value));
  return Array.isArray(data) ? {} : data;
};
export default getSchedules;
