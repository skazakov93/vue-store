const defaultPagination = {
    page: 1,
    rowsPerPage: 10,
    sortBy: 'createdAt',
    descending: true
};
  
const stringifyPagination = ({page, rowsPerPage, sortBy, searchParam}) => {
    const searchStr = searchParam ? searchParam : '';

    return `?page=${page}&limit=${rowsPerPage}&sortBy=${sortBy.value.field}&order=${sortBy.value.order}&search=${searchStr}`;
};
  
export {
    defaultPagination,
    stringifyPagination
}
  