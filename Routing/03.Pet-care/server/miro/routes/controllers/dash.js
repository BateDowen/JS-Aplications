const Pet = require('../../modules/Pet');


exports.getDashboard = (req,res,next) => {
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
        catchError(err,next)
    })
};

exports.getById = (req,res,next) => {
    const petId = req.params.petId;

    Pet.findById(petId)
    .then(pet =>{
        if (!pet) {
            const err = new Error('Could not find pet');
            err.ststusCode = 404;
            throw err;
        };
        res.status(200).json(pet)
    })
    .catch(err =>{
        catchError(err,next)
    })
}

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
        catchError(err,next)

    })
}

exports.catchError  = (err,next) =>{
    if (!err.statusCode) {
        err.statusCode = 500;

    };
    next(err);
}