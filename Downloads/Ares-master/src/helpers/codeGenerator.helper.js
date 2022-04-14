const discountGenerator = () => {
  let coupon = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i += 1) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
};
module.exports = { discountGenerator };
