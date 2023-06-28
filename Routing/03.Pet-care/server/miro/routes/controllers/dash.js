const Pet = require('../../modules/Pet');


exports.getDashboard = (req,res,next) => {
    console.log(req);
};

exports.createPost = (req,res,next) => {
    console.log(req.body);
    let {name,breed,age,weight,image} = req.body;
    const pet = new Pet({
        name,
        breed,
        age,
        weight,
        image
    });
    pet.save()
    .then(result =>{
        res.status(201).json({message: 'Pet created!'})
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;

        };
        next(err);
        
    })
}