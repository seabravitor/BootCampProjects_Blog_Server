const Post = require('../models/PostModels');

class PostController {

    // SHOW ALL POSTS
    async findAllPosts(req, res){
        try {
            const catalogue = await Post.find({})
            res.send(catalogue)
        } catch(error){
            res.send({message: error})
            console.log('====  error  ====>',error)    
        } 
    }

    async createPost(req, res){
        try{
            console.log('Body: ', req.body);
            const data = req.body
            const newBlogPost = new Post(data);
            //save
            newBlogPost.save((error) => {
                if (error) {
                    console.log(error)
                    res.status(500).json({ msg: 'Sorry, internal server errors ======>', error});
                } else {
                    res.json({
                        msg: 'Your data has been saved !!!'
                    });
                }
            });
        }catch(error){
            console.log('error ======>',error)
        }
    }


            //let {title, metaDescription, keywords, body, writer, createdAt } = req.body;
            //try{
            //    const created = await Post.create({title, metaDescription, keywords, body, writer, createdAt})
            //    return res.send({created})
            //}catch(error){
            //    console.log('====  error  ====>',error)
            //}
    //};
    
//    // DELETE CATEGORY
//    async deleteProduct (req, res){
//        let { product, categoryId } = req.body;
//        try{
//            const deleted = await Categories.deleteOne({_id:categoryId}, {product: product})
//            return res.send({deleted})
//        }catch(error){
//            res.send({message: error})
//            console.log('====  error  ====>',error)
//        }
//    }
//};
}

module.exports = new PostController();