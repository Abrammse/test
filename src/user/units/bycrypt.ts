import * as bcrypt from 'bcryptjs';
export async function encodepassword ( password: string ){
     const SALT = await bcrypt.genSalt();
    return await bcrypt.hash(password, SALT);
}


   // return bcrypt.genSalt().then((salt)=>{
        //return bcrypt.hashSync(password, salt)
    //})