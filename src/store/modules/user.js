import {getUsers, getById} from "../../services/http/user";
import {defaultPagination, stringifyPagination} from "../../services/pagination";

export default {
    namespaced: true,

    actions: {
      list({commit}, paginationParams) {
        return getUsers(stringifyPagination(paginationParams))
          .then(users => {
            commit('set', users);
            commit('setPagination', {
              ...paginationParams,
              page: paginationParams.page,
              searchParam: paginationParams.searchParam
            });

            return users;
          })
      },
      loadMore({commit}, paginationParams) {
        return getUsers(stringifyPagination(paginationParams))
          .then(users => {
            if (users.length) {
                commit('add', users);
                commit('setPagination', {
                    ...paginationParams,
                    page: paginationParams.page,
                    searchParam: paginationParams.searchParam
                });
            }

            return users;
          })
      },
      getById({commit}, userId) {
        return getById(userId)
          .then(user => {
            commit('setInMap', user);
  
            return user;
          })
      },
    },

    mutations: {
      set(state, users) {
        state.list = users;

        state.map = state.list.reduce((acc, user) => ({
          ...acc,
          [user.id]: user
        }), {})
      },
      add(state, users) {
        state.list = [
          ...state.list,
          ...users
        ];

        state.map = state.list.reduce((acc, user) => ({
          ...acc,
          [user.id]: user
        }), {})
      },
      setInMap(state, user) {
        state.map = {
          ...state.map,
          [user.id]: user
        }
      },
      setPagination(state, pagination) {
        state.pagination = pagination;
      },
      setViewType(state, viewType) {
        state.viewType = viewType;
      }
    },

    getters: {
      getUserById: (state) => (id) => state.map[id],
      getNextUser: (state) => (id) => {
        let userIndex = state.list.findIndex(user => user.id === id);

        if (state.list.length && userIndex < (state.list.length - 1)) {
          return {
            user: state.list[++userIndex],
            index: userIndex
          };
        }

        return null;
      },
      getPrevUser: (state) => (id) => {
        let userIndex = state.list.findIndex(user => user.id === id);

        if (state.list.length && userIndex > 0) {
          return {
            user: state.list[--userIndex],
            index: userIndex
          };
        }

        return null;
      },
      stringifyPagination: () => (pagination) => stringifyPagination(pagination)
    },

    state: {
      list: [],
      map: {},
      viewType: 'grid',
      pagination: {
        ...defaultPagination,
        rowsPerPage: 12,
        sortBy: {
            label: 'Name asc',
            value: {
                field: 'name',
                order: 'asc'
            }
        },
        searchParam: ''
      }
    }
}
