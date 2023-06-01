import axios from "axios";
// change API here


//

var baseURL = ''


if (location.href.includes('www.app.nexmind.ai')) {
    baseURL = "https://app.nexmind.nexodn.com/api/";
}
else if (location.href.includes('www.platform.nexmind.ai')) {
    baseURL = "https://api.platform.nexmind.ai/api/"
}
else if (location.href.includes('dev616.d1c8b1m65v2d5g.amplifyapp.com')) {
    baseURL = "https://app.nexmind.nexodn.com/api/";
}
else {
    baseURL = "https://app.nexmind.nexodn.com/api/";
}


//



export default axios.create({
    baseURL

});