# Bryntum Demo for Arkyn 

This example uses Bryntum Scheduler, Bryntum Grid, Bryntum Gantt and Bryntum Resource Histogram. The demo is separated into two views:
1. **Gantt View**: It shows a Gantt chart with a Resource Histogram which shows employee allocation
2. **Scheduler View**: It contains a Scheduler along with a Grid of unplanned tasks which can be dragged onto the Scheduler

The Scheduler, the Gantt chart, and the Resource Histogram all share one `ProjectModel` so changes in any of them are automatically reflected in the other widgets in real time. The Grid of unplanned tasks has a different store, but tasks can be dragged from the Grid to the Scheduler to add them to the Scheduler's store (which will also update the Gantt and Histogram).

The demo also contains a small [Express.js](https://expressjs.com) server which serves the data in JSON format. In real world use case, this will of course be replaced by your own backend server.

This application was generated with:

* [React](https://react.dev/) [~18.2.0]
* [Vite](https://vitejs.dev/guide/) [~4.2.0]

# Bryntum Repository access setup

**IMPORTANT NOTE!** These access instructions are mandatory when using the private Bryntum NPM repository.

This application uses npm packages from the Bryntum private NPM repository. You must be logged-in to this repository as
a licensed or trial user to access the packages.

Please check [Online npm repository guide](https://bryntum.com/products/gantt/docs/guide/Gantt/npm-repository) for the detailed information on the
sign-up/login process.

# React integration guide

Please check the [Bryntum React integration online guide](https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/guide) for detailed
integration information and help.

# Installation

Use the following command to install the example packages after the successful login.

Using **npm**:

```shell
$ npm install
```

Using **yarn**:

```shell
$ yarn install
```
# Running the backend server

To run the backend server run this command:

```shell
node server.js
```
The server will start running at: [http://localhost:3000/](http://localhost:3000/)

# Running a development server

To build example and start development server run this command:

Using **npm**:

```shell
$ npm run start
```

Using **yarn**:

```shell
$ yarn run start
```

Navigate to `http://localhost:5173/` or `http://127.0.0.1:5173/` in your browser. We recommend to use latest versions of
modern browsers like Chrome, FireFox, Safari or Edge. The app will automatically reload if you change any of
the source files.

# Creating a production build

To build production code for the example run this command:

Using **npm**:

```shell
$ npm run build
```

Using **yarn**:

```shell
$ yarn run build
```

The build artifacts will be stored in the `build/` directory.

# Distribution zip references

* Bryntum API docs. Open `docs/index.html` in your browser.
* Bryntum Repository guide `docs/guides/npm-repository.md`.
* Bryntum React integration guide `docs/guides/integration/react/guide.md`.

# Online References

* [Vite](https://vitejs.dev/guide/)
* [React Framework](https://react.dev/)
* [Bryntum React integration guide](https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/guide)
* [Bryntum Gantt documentation](https://bryntum.com/products/gantt/docs/)
* [Bryntum Gantt examples](https://bryntum.com/products/gantt/examples/)
* [Bryntum npm repository guide](https://bryntum.com/products/gantt/docs/guide/Gantt/npm-repository)
* [Bryntum support Forum](https://forum.bryntum.com/)
* [Contacts us](https://bryntum.com/contact/)
