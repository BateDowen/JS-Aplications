const Pet = require('../../modules/Pet');


exports.getDashboard = (req,res,next) => {
    const currPage = req.query.page || 1;
    let petsCount;

    Pet.find()
    .countDocuments()
    .then(count =>{
        
        petsCount = count;
        return Pet.find()
    })
    .then( pets =>{
        
        res.status(200).json({query: petsCount, pets: pets})
    })
    .catch(err =>{
        if (!err.statusCode) {
            err.statusCode = 500;

        };
        next(err);
    })
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