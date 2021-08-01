const ShipEngine = require('shipengine')
const engine = new ShipEngine.ShipEngine('TEST_G73rnPl8Acj8QNLnY/Rt/jRxRQrlhnd10VJxzoG9LU4')

engine.getCarriers().then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('error',err)
});
