

export const CONSTANTS: IConsts = {
    /** 
      returnURLCookieName is a constant with value 'returnPage' */
    returnURLCookieName: "returnPage",

    /** 
      localProviderName is a constant with value 'local' */
    localProviderName: "local",

    /** activeDirectoryProviderName is a constant with value 'ActiveDirectory' */
    activeDirectoryProviderName: "ActiveDirectory",

    /** googleProviderName is a constant with value 'Google' */
    googleProviderName: "Google",

    /** facebookProviderName is a constant with value 'Facebook' */
    facebookProviderName: "Facebook"
}

interface IConsts {
    returnURLCookieName: any;
    localProviderName: string;
    activeDirectoryProviderName: string;
    googleProviderName: string;
    facebookProviderName: string;
}

export const URLSegments =
{
    profileIdSegment: "profileId",
}
