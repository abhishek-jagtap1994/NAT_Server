const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const db = require('_helpers/db');

const Role = require('../roles/roles.model');
const Permission = require('../roles/permission.model');


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
     update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await Role.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await Role.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
 
    // save user
    console.log(params)
   const Main = await Role.create(params);
    //await Role.create({ role_name:params.role_name , role_description:params.role_description ,role_type:params.role_type});
   
    const headerId = Main.role_id     
    const activity_id = Main.activity_id
    
    console.log("activity_id" + activity_id);
   await Permission.create({ main_role_id:headerId , activity_id:activity_id ,permission_text:"1"})      

}


// async function permiss(params) {
     
    
// }

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await Role.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await Role.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}