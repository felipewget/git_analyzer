import { usersModal } from './../models/usersSchema';
import { sessionsModel } from './../models/sessionSchema';
import bcrypt from 'bcrypt';
import config from './../../server/config';
import mongoose from 'mongoose';

class AuthController {

    async login( req: any, res: any )
    {

        let { login, password } = req.body.login
                                    ? req.body
                                    : req.query;

        // Check Fields
        if( !( login && password && password.trim().length > 0 && login.trim().length > 0 ) ){
            
            res.send({
                success: false,
                error: "MANDATORY_FIELDS"
            });
            return;

        }

        if( password.trim().length < 6 && login.trim().length < 6 ){

            res.send({
                success: false,
                error: "INVALID_AUTH"
            })
            return;

        }

        // Valida email
        // console.log( "password", password)
        
        let response: Array<any> = await usersModal.find({ email: login, password: password });
        if( response.length == 0 ){

            res.send({
                success: false,
                error: "INVALID_AUTH"
            });
            return;

        }

        // @TODO deletetar outras sessoes


        // to gerate a random hash
        let hash = await bcrypt.hash( `${password}${Date.now()}`, 10 );

        // Create Session
        let response_session: any = await new sessionsModel({
            _id: mongoose.Types.ObjectId(),
            type: 'user',
            user_id: response[0]._id,
            auth_token: hash,
        }).save();

        res.send({
            success: true,
            metadata: {
                user_id : response[0]._id,
                name    : response[0].name,
                auth_token: response_session.auth_token
            }
        })
        return;

    }

    async logout( req: any, res: any )
    {

        let conditions: any = { user_id: req.user_id, deleted_at: { $exists: false } };
        await sessionsModel.updateMany( conditions, { deleted_at: Date.now() }, { upsert: false });

        res.send({
            success: true
        })

    }

    async register( req: any, res: any )
    {

        let { name, login, password } = req.body.login
                                        ? req.body
                                        : req.query;

        // Check Fields
        if( !( login && password && name && name.trim().length > 0 && password.trim().length > 0 && login.trim().length > 0 ) ){
            
            res.send({
                success: false,
                error: "MANDATORY_FIELDS"
            });
            return;

        }

        if( password.trim().length < 6 && login.trim().length < 6 && name.trim().length < 6 ){

            res.send({
                success: false,
                error: "INVALID_FIELD_VALUES"
            });
            return;

        }

        // Check email valid... check 

        // Check if was registred
        let response = await usersModal.find({ email: login });
        if( response.length > 0 ){

            res.send({
                success: false,
                error: "LOGIN_ALREADY_REGISTRED"
            });
            return;

        }

        let obj_user = {
            _id     : mongoose.Types.ObjectId(),
            name    : name,
            email   : login,
            password: password,
            balance : config.trial_balance
        };

        await new usersModal( obj_user ).save();
        
        res.send({
            success: true
        })
        return;

    }

    async getDataUser( req: any, res: any )
    {

        let response_user: any = await usersModal.findOne({ _id: req.user_id });

        res.send({
            success: true,
            metadata: {
                user_id: req.user_id,
                name: response_user.name,
                email: response_user.email,
                balance: response_user.balance,
                auth_token: req.headers.auth_token,
            }
        })
        return;

    }

    async updatePassword()
    {

    }

    async updateUser()
    {

    }

}

export default new AuthController();