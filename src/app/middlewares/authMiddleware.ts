import { response } from 'express';
import { sessionsModel } from './../models/sessionSchema';

export const checkAuth = async ( req: any, res: any, next: any ) => {
    
    if( req.headers && req.headers.auth_token ){

        let response_session: any = await sessionsModel.findOne({ auth_token: req.headers.auth_token, deleted_at: { $exists: false } });
        
        if( response_session && response_session.user_id ){

            req.user_id = response_session.user_id
            next();

        } else {

            res.send({
                success: false,
                error: 'INVALID_TOKEN'
            });
            return;

        }

    } else {

        res.send({
            success: false,
            error: 'INVALID_TOKEN'
        });
        return;

    }

}