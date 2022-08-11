const S = require("sequelize")
const db = require("../db")

class Orders extends S.Model{}

Orders.init({   
orderNumber:{
    type: S.STRING,
    defaultValue: null,
},
 products_buy:{
    type: S.ARRAY(S.JSON),
    defaultValue: [],
  }, 
price_final:{
    type: S.INTEGER,
    defaultValue: 0,
    
  },
userNumber:{
    type:S.INTEGER,
},
fullfilled:{
    type: S.BOOLEAN,
    defaultValue: false,
},
rejected:{
    type: S.BOOLEAN,
    defaultValue: false,
},

},{
sequelize: db,
modelName: "orders"
})


 Orders.addHook("afterValidate",(order)=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    order.orderNumber = `${order.userNumber}/${day}/${month}/${year}` 
 })
module.exports = Orders