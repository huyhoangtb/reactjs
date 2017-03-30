/**
 * Created by Peter Hoang Nguyen on 3/28/2017.
 */
const mediaRoot = "/public/media/";
const Configuration = {
    autoDetectMissingMessage: true,

    media: {
        img: {
            path: mediaRoot + "images",
        }
    },
    defaultLogo: mediaRoot + "images/default/logo.png",
}

export default Configuration;