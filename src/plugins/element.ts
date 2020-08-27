import Vue from 'vue';
import {
  Button, Container, Header, Main, Footer, Menu, MenuItem, Submenu, Avatar, Card, Row, Col, Alert, Link, Form, FormItem,
  Input, Dialog, Message, Loading, Drawer, Divider
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Container);
Vue.use(MenuItem);
Vue.use(FormItem);
Vue.use(Divider);
Vue.use(Submenu);
Vue.use(Avatar);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Footer);
Vue.use(Header);
Vue.use(Alert);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(Link);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Col);
Vue.use(Row);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
