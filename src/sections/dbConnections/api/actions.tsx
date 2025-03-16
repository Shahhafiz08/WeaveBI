import axios, { endpoints } from 'src/utils/axios';

// get Database list
export const getDatabase = async () => {
  try {
    const database = await axios.get(endpoints.database.get);
    return database.data;
  } catch (error) {
    throw new Error('Unable to get database data', error);
  }
};

// Delete database
export const deleteDatabase = async (id: number) => {
  try {
    await axios.delete(`${endpoints.database.delete}/${id}`);
  } catch (error) {
    throw new Error('Unable to delete database');
  }
};
