// Now whit every request we gonna check for those 2

import axios from "axios";

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;
