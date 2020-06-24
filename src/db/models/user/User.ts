import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    recover_password_token: string;
    recovery_email: string;
    isEnabled: Boolean;
}

const UserSchema = new Schema({
    username : { type : String, required: true, unique: true},
    name : { type : String, required: true},
    last_name: { type : String , required : true},
    email : {type : String, unique:true},
    password : {type : String, required: true},
    recover_password_token: String,
    recovery_email: String,
    isEnabled : { type: Boolean, default: true }
},{
    timestamps:true,
    versionKey: false
})

const UserModel = model<IUser>('User', UserSchema, 'user');

export { UserModel }
