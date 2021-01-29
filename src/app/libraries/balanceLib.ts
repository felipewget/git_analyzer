import mongoose from 'mongoose'
import { usersModal } from './../models/usersSchema'

class BalanceLib {

    async getMyBalance( user_id: mongoose.Types.ObjectId )
    {

        try {

            let response_user: any = await usersModal.findOne({ _id: user_id });
            if( response_user.balance ){
                return response_user.balance
            } else {
                return 0;
            }

        } catch ( e ){

            console.log(`Balance Error: ${e.message}`)
            return 0;

        }

    }

    async removeCoinsFromBalance( user_id: mongoose.Types.ObjectId, number_of_coin: number = 0 )
    {

        try {

            let response_user: any = await usersModal.findOne({ _id: user_id });
            if( response_user.balance ){
                
                let new_balance = response_user.balance - number_of_coin;

                await usersModal.updateOne( { _id: user_id }, { $set: { balance: new_balance } }, { upsert: false });

                return new_balance;

            } else {
                return 0;
            }

        } catch ( e ){

            console.log(`Balance Error: ${e.message}`)
            return 0;

        }

    }

}

export default BalanceLib;