import React, { useContext, useState, useEffect, useRef } from 'react';
import { func, shape } from 'prop-types';

import { checkoutData, checkoutStart } from '../../../api/checkout';
import Card from '../../../../../../components/common/Card';
import RadioInput from '../../../../../../components/common/Form/RadioInput';
import RootElement from '../../../../../../utils/rootElement';
import CartContext from '../../../../../../context/Cart/CartContext';

import { paymentMethodShape } from '../../../utility';

function Ratenkauf({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const [cartData] = useContext(CartContext);
  const amount = cartData.cart.prices.grandTotalAmount;

  const config = RootElement.getPaymentConfig(); // eslint-disable-line

  const checkoutComponent = useRef(null);
  const [data, setData] = useState({});
  const [oldAmount, setOldAmount] = useState(amount);

  useEffect(() => {
    if (isSelected) {
      checkoutData().then((_data) => {
        setData(_data);
      });
    }
  }, [isSelected, oldAmount]);

  const checkoutLabel = (name, value) => {
    const inputId = `${name}_${value}`;

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={inputId}>
          <easycredit-checkout-label>not empty</easycredit-checkout-label>
        </label>
      </>
    );
  };

  const radioInputElement = (
    <RadioInput
      value={method.code}
      label={checkoutLabel('paymentMethod', method.code)}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  const handleSubmit = () => {
    checkoutStart().then((_data) => {
      if (_data.message) {
        setData({ error_message: _data.message });
        return;
      }
      window.location.replace(_data.redirect_url);
    });
  };

  useEffect(() => {
    const waitForHydration = () => {
      const element = checkoutComponent.current;
      if (!element || !element.classList.contains('hydrated')) {
        window.setTimeout(() => {
          waitForHydration();
        }, 50);
        return () => {};
      }

      element.addEventListener('submit', handleSubmit);
      return () => {
        element.removeEventListener('click', handleSubmit);
      };
    };

    if (!isSelected) {
      return () => {};
    }
    return waitForHydration();
  }, [isSelected]);

  // trigger force re-render when amount changes
  if (amount !== oldAmount) {
    setOldAmount(amount);
    console.log('amount changed: return null'); // eslint-disable-line
    return null;
  }

  if (!isSelected) {
    return (
      <>
        {radioInputElement}
        <div className="hidden" />
      </>
    );
  }

  if (amount !== oldAmount) {
    setOldAmount(amount);
    return null;
  }

  return (
    <>
      <div>{radioInputElement}</div>
      <div className="mx-4 my-4">
        <Card>
          <div className="container flex flex-col justify-center w-4/5">
            <easycredit-checkout
              ref={checkoutComponent}
              webshop-id={config.easycredit.apiKey}
              amount={amount}
              alert={data.error_message}
            >
              not empty
            </easycredit-checkout>
          </div>
        </Card>
      </div>
    </>
  );
}

Ratenkauf.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Ratenkauf;
