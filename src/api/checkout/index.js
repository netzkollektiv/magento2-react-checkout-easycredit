import { config } from '../../../../../config';

export async function checkoutData() {
  const response = await fetch(
    `${config.baseUrl}/rest/default/V1/easycredit/checkout/data/${config.cartId}`
  );
  return response.json();
}
export async function checkoutStart() {
  const response = await fetch(
    `${config.baseUrl}/rest/default/V1/easycredit/checkout/start/${config.cartId}`
  );
  return response.json();
}
