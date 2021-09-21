<template>
  <div class="user-details-page">
    <h2>User Details</h2>

    <user-details
      v-if="user"
      :user="user"
    />

    <div class="navigation-box">
      <prev-btn
        v-show="hasPreviousUser"
        @click="onPrevClick"
      />
      
      <next-btn
        v-show="hasNextUser"
        @click="onNextClick"
      />
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import UserDetails from '../components/UserDetails';
  import NextBtn from '../components/common/NextBtn';
  import PrevBtn from '../components/common/PrevBtn';

  export default {
    name: "UserDetailsPage",
    components: {
      UserDetails,
      NextBtn,
      PrevBtn
    },
    props: {
      userId: {
        type: String,
        required: true
      }
    },

    data:() => ({
      hasPreviousUser: true,
      hasNextUser: true,
      loadNext: true
    }),

    computed: {
      ...mapState({
        users: state => state.user.list,
        pagination: state => state.user.pagination,
      }),
      ...mapGetters({
        getUserById: 'user/getUserById',
        getNextUser: 'user/getNextUser',
        getPrevUser: 'user/getPrevUser'
      }),
      user() {
        return this.getUserById(this.userId);
      }
    },

    methods: {
      onNextClick() {
        const nextUser = this.getNextUser(this.userId);
        if (nextUser) {
          this.hasPreviousUser = true;
          this.hasNextUser = true;
          this.loadNext = true;

          this.$router.replace({
            name: 'UserDetailsPage',
            params: {
              userId: nextUser.user.id
            }
          })
        }
        else {
          this.$q.loading.show();
          this.$store.dispatch('user/loadMore', {
            ...this.pagination,
            page: this.pagination.page + 1
          })
          .then(() => {
            this.$q.loading.hide();

            if (this.loadNext) {
              this.onNextClick();
            }
            else {
              this.hasNextUser = false;
            }
            
            this.loadNext = false;
          })
          .catch(err => this.$q.loading.hide())   
        }
      },
      onPrevClick() {
        const prevUser = this.getPrevUser(this.userId);
        if (prevUser) {
          this.hasPreviousUser = true;
          this.hasNextUser = true;

          this.$router.replace({
            name: 'UserDetailsPage',
            params: {
              userId: prevUser.user.id
            }
          })
        }
        
        if (!prevUser || prevUser.index <= 0) {
          this.hasPreviousUser = false;
        }
      }
    },

    created() {
      this.$q.loading.show();
      this.$store.dispatch('user/getById', this.userId)
      .then(() => this.$q.loading.hide())
      .catch(err => this.$q.loading.hide())

      if (!this.users.length) {
        this.hasPreviousUser = false;
        this.hasNextUser = false;
      }
    }
  }
</script>

<style lang="scss">
  @import "UserDetailsPage";
</style>
