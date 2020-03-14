export const App: any = {
  store: "Hbuys", // change this with your app name
  url: "https://hbuys.net/", // change this with your URL (please use https, recommended)
  consumerKey: "ck_656e4187a5dbcb654eaac107db172194313cfd61", // change this with your Consumer Key from WooCommerce
  consumerSecret: "cs_114b0b7310ce0adce541035a84290e7105c6fe90", // change this with your Consumer Secret from WooCommerce
  IosAppId: "", // FOR IOS RATING USE APPLE ID from appstoreconnect

  languages: [
    //Don't Change multilanguage is in beta
    { id: "en", name: "English" },
    { id: "hi", name: "हिन्दी" },
    { id: "ar", name: "عربى" }
  ],
  defaultLang: "en" //Don't Change multilanguage is in beta
};
