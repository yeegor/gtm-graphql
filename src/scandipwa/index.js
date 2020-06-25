module.exports = [
    "./app/plugin/AdditionalRoutes.plugin",
    "./app/plugin/GTMHocWrapper.plugin",
    "./app/plugin/StoreModifications.plugin",
    "./app/plugin/AddGtmToConfigQuery.plugin",

    "./app/plugin/event-dispatches/addToCart.plugin.js",
    "./app/plugin/event-dispatches/cartItemChangeQuantity.plugin.js",
    "./app/plugin/event-dispatches/cartItemRemove.plugin.js",
    "./app/plugin/event-dispatches/checkout.plugin.js",
    "./app/plugin/event-dispatches/checkoutOption.plugin.js",
    "./app/plugin/event-dispatches/impressions.plugin.js",
    "./app/plugin/event-dispatches/myAccountLoginRegister.plugin.js",
    "./app/plugin/event-dispatches/productClick.plugin.js",
    "./app/plugin/event-dispatches/productDetail.plugin.js",
    "./app/plugin/event-dispatches/purchase.plugin.js",
];
