# express-firebase-server-helper
An express middleware which helps you to control firebase-server via get/post access.
## Usage
With webpack dev server, this middleware is useful to control firebase-server which is a mock of firebase service.
To use as middleware of webpack dev server,
```
const expressFirebaseServerHelper = require("express-firebase-server-helper");

module.exports = {
    //...
    devServer: {
        setup(app) {
            app.use("/firebase-server", expressFirebaseServerHelper());
        }
    }
};
```
Then you can get which port firebase-server is listening via access /firebase-server/port
```
curl http://localhost:8080/firebase-server/port
```
To get internal values,
```
curl http://localhost:8080/firebase-server/get-value
curl http://localhost:8080/firebase-server/export-data
```
### Options
You can also pass options to middleware.
```
expressFirebaseServerHelper({
    port: 5000
})
```
#### port
Port number that firebase-server should listen to.  
default: scan unused port automatically.
