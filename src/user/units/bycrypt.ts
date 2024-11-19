import * as bcrypt from 'bcryptjs';
export async function encodepassword ( password: string ){
     const SALT = await bcrypt.genSalt();
    return await bcrypt.hash(password, SALT);
}


export async function comparepassword ( password: string, hash:string ){    
   return await bcrypt.compare(password, hash);
}



   // return bcrypt.genSalt().then((salt)=>{
        //return bcrypt.hashSync(password, salt)
    //})