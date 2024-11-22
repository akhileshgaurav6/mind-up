import { privateAxios } from "../config/axios.config";

//create category api call
export const createCategory = async(category) => {
    const result = await privateAxios.post('/categories', category)
    return result.data;
};

//get All categories api call
export const getAllCategories = async(pageSize=50, pageNumber=0) => {
    const result = await privateAxios.get(`/categories?pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`);
    return result.data;
}