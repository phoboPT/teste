const { forwardTo } = require('prisma-binding');

const Query = {
     suppliers: forwardTo('db'),
     products: forwardTo('db'),
     product: forwardTo('db'),
     supplier:forwardTo('db'),
    
};

module.exports = Query;
