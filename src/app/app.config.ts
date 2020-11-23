export const App: any = {
  store: "Fastcon Shopping", // change this with your app name
  url: "https://www.fastconshopping.com", // change this with your URL (please use https, recommended)
  consumerKey: "ck_c933773ee5a241fd065610dd89f4c71c767d8e2f", // change this with your Consumer Key from WooCommerce
  consumerSecret: "cs_8bdab20f412f1af99c353e31eb355e867bd56ffc", // change this with your Consumer Secret from WooCommerce
  IosAppId: "", // FOR IOS RATING USE APPLE ID from appstoreconnect

  languages: [
    //Don't Change multilanguage is in beta
    { id: "en", name: "English" },
    { id: "hi", name: "हिन्दी" },
    { id: "ar", name: "عربى" },
  ],
  defaultLang: "en", //Don't Change multilanguage is in beta
};
