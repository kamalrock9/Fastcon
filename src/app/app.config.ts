export const App: any = {
  store: "Fastcon Shopping", // change this with your app name
  url: "https://fastconshopping.com", // change this with your URL (please use https, recommended)
  consumerKey: "ck_701fbf326967bc32034f0021becd110fd50dc96c", // change this with your Consumer Key from WooCommerce
  consumerSecret: "cs_4151a64ccc00b7a6752816ee25f8f94713e23873", // change this with your Consumer Secret from WooCommerce
  IosAppId: "", // FOR IOS RATING USE APPLE ID from appstoreconnect

  languages: [
    //Don't Change multilanguage is in beta
    { id: "en", name: "English" },
    { id: "hi", name: "हिन्दी" },
    { id: "ar", name: "عربى" },
  ],
  defaultLang: "en", //Don't Change multilanguage is in beta
};
