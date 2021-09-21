<template>
  <div class="users-list-page">
    <h2>Users List</h2>

    <div class="filter-box">
      <search
        label="Search"
        :value="pagination.searchParam"
        @input="onSearchInput"
      />

      <sort
        label="Sort by"
        :value="pagination.sortBy"
        :options="sortByOptions"
        @input="onSortChange"
      />
    </div>

    <view-picker
      :value="viewType"
      @select="onViewPickerChange"
    />

    <users-grid-view
      v-if="viewType === 'grid'"
      :users="users"
      @click="onUserClick"
    />

    <users-list-view
      v-if="viewType === 'list'"
      :users="users"
      @click="onUserClick"
    />

    <load-more
      v-if="hasMoreUsers"
      @loadMore="onLoadMore"
    />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Search from '../components/common/Search';
  import Sort from '../components/common/Sort';
  import ViewPicker from '../components/common/ViewPicker';
  import UsersGridView from '../components/UsersGridView';
  import UsersListView from '../components/UsersListView';
  import LoadMore from '../components/common/LoadMore';

  export default {
    name: "UsersListPage",
    components: {
      Search,
      Sort,
      ViewPicker,
      UsersGridView,
      UsersListView,
      LoadMore
    },

    data:() => ({
      hasMoreUsers: true,
      sortByOptions: [
        {
          label: 'Name Asc',
          value: {
            field: 'name',
            order: 'asc'
          }
        },
        {
          label: 'Name Desc',
          value: {
            field: 'name',
            order: 'desc'
          }
        },
        {
          label: 'Email Asc',
          value: {
            field: 'email',
            order: 'asc'
          }
        },
        {
          label: 'Email Desc',
          value: {
            field: 'email',
            order: 'desc'
          }
        }
      ]
    }),

    computed: {
      ...mapState({
        users: state => state.user.list,
        pagination: state => state.user.pagination,
        viewType: state => state.user.viewType
      })
    },

    methods: {
      getUsers(pagination) {
        this.$q.loading.show();
        this.$store.dispatch('user/list', pagination)
          .then(users => {
            this.$q.loading.hide();
            
            this.hasMoreUsers = users.length;
          })
          .catch(err => this.$q.loading.hide())
      },
      onSearchInput(value) {
        this.getUsers({
            ...this.pagination,
            page: 1,
            searchParam: value
        })
      },
      onSortChange(value) {
        this.getUsers({
          ...this.pagination,
          page: 1,
          sortBy: value
        })
      },
      onViewPickerChange(value) {
        this.$store.commit('user/setViewType', value);
      },
      onLoadMore() {
        this.$q.loading.show();
        this.$store.dispatch('user/loadMore', {
          ...this.pagination,
          page: this.pagination.page + 1
        })
        .then(users => {
          this.$q.loading.hide();

          if (!users.length) {
            this.hasMoreUsers = false;
          }
        })
        .catch(err => this.$q.loading.hide())
      },
      onUserClick(userId) {
        this.$router.push({
          name: 'UserDetailsPage',
          params: {
            userId: userId
          }
        })
      }
    },

    created() {
      if (!this.users.length) {
        this.getUsers(this.pagination);
      }
    }
}
</script>

<style lang="scss">
  @import "UsersListPage";
</style>