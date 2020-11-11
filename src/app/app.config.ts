export const App: any = {
  store: "Fastcon Shopping", // change this with your app name
  url: "https://www.fastconshopping.com", // change this with your URL (please use https, recommended)
  consumerKey: "ck_6f8d732eb1d0c4221bd8568fc3f77ece1497dbab", // change this with your Consumer Key from WooCommerce
  consumerSecret: "cs_c8a0a0e6b60e8047716772e2f35888aca5b7b4fb", // change this with your Consumer Secret from WooCommerce
  IosAppId: "", // FOR IOS RATING USE APPLE ID from appstoreconnect

  languages: [
    //Don't Change multilanguage is in beta
    { id: "en", name: "English" },
    { id: "hi", name: "हिन्दी" },
    { id: "ar", name: "عربى" },
  ],
  defaultLang: "en", //Don't Change multilanguage is in beta
};
