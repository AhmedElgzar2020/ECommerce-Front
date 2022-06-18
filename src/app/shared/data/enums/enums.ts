export enum LanguageId {
    ar = 1,
    en = 2,
}

export enum AcceptLanguageHeader {
    "ar-sa" = 1025,
    "en-us" = 1033,
    "fr-fr" = 1036

}

export enum ResponseStatus {
    Success = 0,
    Error = 1,
    AuthFailure = 2,
    Conflict = 3,
}

export enum MessageMode {
    None = 0,
    Success = 1,
    Error = 2,
    Warning = 3,
    Empty= 4
}