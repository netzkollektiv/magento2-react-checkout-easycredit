# magento2-hyva-checkout-easycredit
EasyCredit-Ratenkauf Payment method for the Hyvä React Checkout

## Prerequisites

1. A working Magento site with **[easyCredit-Ratenkauf for Magento 2](https://github.com/teambank/ratenkaufbyeasycredit-plugin-magento-2/)** module installed and setup.
2. **[Hyvä Checkout](https://github.com/hyva-themes/magento2-react-checkout)** is installed and setup.

## How to use it with Hyvä Checkout
?
Below you will find the steps to integrate easyCredit-Ratenkauf payment method.

1. Add the easycredit react components to the Hyvä Checkout by adding below code in your `package.json`.

    File: `src/reactapp/package.json`
    ```
    "config": {
        "paymentMethodsRepo": {
            "easycredit": "https://github.com/netzkollektiv/magento2-react-checkout-easycredit.git"
        }
    },
    ```

    With this code in `package.json` and running `npm install`, then you are all set. This repo will be copied into the Hyvä Checkout and configured correctly.

2. Finally, we need to build the app again. For this, you need to run `npm run build` from the root directory of Hyvä Checkout module. After this, if you navigate to the checkout page from your site, then you will see all the easyCredit-Ratenkauf payment method you have configured in the above step.

## Documentation

- If you need information on the build process of the React Checkout, then you can **[read more about it here](https://hyva-themes.github.io/magento2-react-checkout/build/)**.
- If you want to know more about how Hyvä Checkout helps you to integrate any payment methods, then **[read more about it here](https://hyva-themes.github.io/magento2-react-checkout/payment-integration/)**.
- The official documentation of **[Hyvä React Checkout](https://hyva-themes.github.io/magento2-react-checkout)**
- The documentation of **[easyCredit-Ratenkauf](https://netzkollektiv.com/docs/easycredit-ratenkauf-magento2/)** module

## License

The MIT License (MIT).
