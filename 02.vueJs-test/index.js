(function() {
  var search = new Vue({
    el: '#search',
    data: {
      people: [
        { firstName: 'Naohiro', lastName: 'Nakajima' },
        { firstName: 'Kazuhito', lastName: 'Hokamura' },
        { firstName: 'Takeshi',  lastName: 'Takatsudo' },
        { firstName: 'Akihiro',  lastName: 'Oyamada' },
        { firstName: 'Kazunori',  lastName: 'Tokuda' },
        { firstName: 'Yukihisa',  lastName: 'Yamada' }
      ]
    }
  });

  var bind = new Vue();

  bind.$mount('#bind');
  bind.$set('fName', 'test');
  bind.fName = '変更したよ';
  console.log(bind.$data.fName);
  console.log(bind.fName);

  var click = new Vue({
    el: '#click',
    data: {
      name: 'clickTarget'
    },
    methods: {
      changeName: function() {
        this.name = '変更　下';
      }
    }
  });

  click.$log();

  Vue.partial('name-partial', '<h1>my-partial</h1><p>My name is {{name}}</p>');

  var template = new Vue({
    el: '#template',
    data: {
      name: 'temp'
    },
    template: '<template v-partial="name-partial">{{name}}</template>'
  });



  var login = new Vue({
    el: '#login',
    data: {
      name: 'hoge',
      partialId: 'regist'
    },
    template:
      '<template v-partial="{{partialId}}"></template>',
    methods: {
      login: function() {
        this.partialId = 'mypage';
      },
      logout: function() {
        this.partialId = 'regist';
      }
    },
    partials: {
      'regist': '<h1>ログインしていません</h1><p><a href="#">登録画面へ</a></p><p><button v-on="click: login">ログイン</button></p>',
      'mypage': '<h1>ログインしています</h1><p>user: {{name}}</p><p><a href="#">マイページへ</a></p><p><button v-on="click: logout">ログアウト</button></p>'
    }

  });

  var repeat = new Vue({
    el: '#repeat',
    data: {
      colors: [
        {name: "red", colorCode: ["#ff0000", "#aa0000", "#770000"] },
        {name: "green", colorCode: ["#00ff00", "#00aa00", "#007700"] },
        {name: "blue", colorCode: ["#0000ff", "#0000aa", "#000077"] }
      ]
    },
    template:
      '<li v-repeat="colors">' +
        '<p>{{name}}</p>' +
        '<span v-repeat="color: colorCode">{{color}} </span>'+
      '</li>'

  });



}());