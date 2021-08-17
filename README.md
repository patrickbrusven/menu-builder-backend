# Menu-Builder App
This application is designed to give restaurants the ability to update their online menus through an application that provides a RESTApi endpoint.

# Description
This application is built utilizing the MEVN stack. The backend is built utilizing NodeJS and Express and serves a MongoDB Cloud Atlas database. Mongoose is used for schema based modeling of users menus and menuItems. Joi schema for server side data validation. Authorized routes are authenticated with JSON web token.
the frontend is built utilizing Vue3, Vuex for state managment, and vue-router. Axios for XMLHttpRequests. vuelidate for client side validation.

## Project setup
```
npm install
```

### Compiles and hot-reloads front-end for development
```
npm run serve
```

### Compiles and hot-reloads server for development
```
npm run dev
```
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
