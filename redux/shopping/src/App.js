import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import { cartActions } from './store/cart-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state)=>state.ui.cartIsVisible);
  const cart = useSelector((state)=>state.cart);
  const notification = useSelector((state)=>state.ui.notification);

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Fetching...',
          message: 'Fetching cart data!',
        })
      );

      try {
        const response = await fetch(
          'https://shopping-app-85907-default-rtdb.firebaseio.com/cart.json'
        );

        if (!response.ok) {
          throw new Error('Fetching cart data failed');
        }

        const data = await response.json();

        if (data) {
          // Update the cart in the Redux store with the fetched data
          dispatch(cartActions.replaceCart(data));
          dispatch(
            uiActions.showNotification({
              status: 'success',
              title: 'Success!',
              message: 'Fetched cart data successfully!',
            })
          );
        } else {
          dispatch(
            uiActions.showNotification({
              status: 'success',
              title: 'Empty Cart',
              message: 'No items in the cart.',
            })
          );
        }
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!',
          })
        );
      }
    };
    fetchCartData();
  }, [dispatch]);

  useEffect(()=>{
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending...',
        message:'Sending cart data!'
      }))
      const response = await fetch('https://shopping-app-85907-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
        body: JSON.stringify(cart),
      });

      if(!response.ok){
        throw new Error('Sending cart data failed');
      }

      dispatch(uiActions.showNotification({
        status:'success',
        title:'Success!',
        message:'Sent cart data successfully!'
      }))
    }

    if(isInitial){
      isInitial=false;
      return;
    }

    sendCartData().catch(error=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!',
        message:'Sending cart data Failed!'
      }))
    })
    
  }, [cart, dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
