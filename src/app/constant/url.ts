export enum URL{
    BASE_URL = "http://localhost",
    PORT_NUMBER = ":8080",
    BASE_DOMAIN = "/entry" ,
    GET_ALL_ENTRIES_LOG = BASE_URL + PORT_NUMBER + BASE_DOMAIN,
    ADD_ENTRY_LOG = BASE_URL + PORT_NUMBER + BASE_DOMAIN + "/add-new-entry",
    DELETE_ENTRY_LOG = BASE_URL + PORT_NUMBER + BASE_DOMAIN + "/delete-entry"
}