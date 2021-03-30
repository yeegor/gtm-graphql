# GTM extension for ScandiPWA

**Heads up!** This extension installation will only make you halfway to success. Supplementing it with a [GTM extension front-end](https://github.com/scandipwa/gtm-fe) is a **must**

This endpoint allows to get GTM fields from Admin.

```graphql
query {
    getGtm {
        enabled
        gtm_id
    }
}
```
