module.exports = router
let express = require('express');
let productRouter = express.Router();
let mongodb = require('mongodb').MongoClient
let url = process.env.MONGO_URL
function router(menu)
{
    productRouter.route('/')
        .get((req,res) => 
        {
            mongodb.connect(url,function(err,dc)
            {
                if(err){
                    res.status(500).send('Error While Connecting')
                }
                else{
                    let dbobj = dc.db('nodeDb');
                    dbobj.collection('products').find().toArray(function(err,results){
                        if(err){
                            res.status(203).send('Error While Fetching')
                        }
                        else
                        {
                            res.render('products',{title:'Products Page',data:results,menu})

                        }
                    })
                }

            })
        
    })    

    productRouter.route('/details')
        .get((req,res) => 
    {
        res.send('Product Details')
    })
    return productRouter
}

module.exports = router