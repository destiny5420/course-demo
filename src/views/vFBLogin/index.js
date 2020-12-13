export default {
  name: 'vFBLogin',
  props: {},
  components: {},
  data: function() {
    return {
      appleID: '2190115827787313',
    };
  },
  methods: {
    checkStatus: function() {
      console.log('click checkStatus button in button!');
      FB.getLoginStatus((response) => {
        console.warn('check fb status', response);
      });
    },
    login: function() {
      console.log('click login button!');
      FB.login(
        (response) => {
          console.log(response);
          if (response.authResponse) {
            console.log('Welcome! Fetching your information...');
            FB.api('/me', { fields: 'name,id,email,birthday,gender' }, function(response2) {
              console.log('Good to see you, ', response2);
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email,user_birthday,user_gender', return_scope: true },
      );
    },
    logout: function() {
      console.log('click logout button!');
      FB.logout((response) => {
        console.log('User logout successfully! ', response);
      });
    },
  },
  computed: {},
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {
    console.log('-- Start beforeMounted --');

    console.log('-- End beforeMounted --');
  },
  mounted: function() {
    const vm = this;
    console.warn('FB Login page / mounted!');
    window.fbAsyncInit = function() {
      FB.init({
        appId: '2190115827787313',
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      });

      FB.AppEvents.logPageView();
      vm.checkStatus();
    };
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
