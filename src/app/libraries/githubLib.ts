import axios from 'axios'

type KindOfRepositorie = 'all' | 'owner' | 'fork';

class GithubLib {

    repositories: any; // @TODO
    username: string = "";
    type: KindOfRepositorie;
    was_researched: boolean;

    constructor( username?: string )
    {
        this.was_researched = false;
        this.type = 'all';
        if( username ){
            this.username = username;
        }
        
    }

    setUsername( username: string ): void
    {
        this.username = username;
    }

    setTypeOfRepositories( type: KindOfRepositorie ): void
    {
        this.type = type;
    }

    listRepositories( collums: Array<string> = [] )
    {

        // Filter types
        let repos = this.repositories.filter( (obj: { fork: boolean; }) => {

            switch( true ){
                case this.type == "all":
                    return true;
                case this.type == "owner" && !obj.fork:
                    return true;
                case this.type == "fork" && obj.fork:
                    return true;
                default:
                    return false;
            }

        });

        // Filter Collums
        if( collums.length > 0 ){

            repos = repos.map( (obj: any) => {

                let response: any = {};
                for( let i in collums ){

                    let index: any = collums[i];
                    if( obj[index] ){
                        response[index] = obj[index];
                    }

                }

                return response;

            })

        }

        return repos;

    }

    countRepositories()
    {

        try {

            if( !this.was_researched ){
                
                return {
                    success: false,
                    error: "Make a search first"
                }

            }

            let count_all   = 0;
            let count_owner = 0;
            let count_fork  = 0;

            for( let i in this.repositories ){

                count_all++;
                if( !this.repositories[i].fork ){ // Fork
                    count_fork++;
                } else { // Owner
                    count_owner++;
                }

            }

            return {
                success: true,
                metadata: {
                    all     : count_all,
                    owner   : count_owner,
                    fork    : count_fork
                }
            }

        } catch( e ){
            
            return {
                success: false,
                error: e.message
            };

        }

    }

    async curlGetRepositories()
    {

        try {

            if( this.username.length > 0 ){

                let endpoint = `https://api.github.com/users/${this.username}/repos`;
    
                let { data } = await axios.get( endpoint );
    
                this.repositories = data;
                this.was_researched = true;

                return {
                    success: true,
                    metadata: data
                }
    
            } else {
    
                return {
                    success: false,
                    error: "Username is not defined"
                };
    
            }

        } catch ( e ) {

            return {
                success: false,
                error: e.message
            };

        }

    }

    async curlGetLanguagesByRepoName( repo_name: string )
    {

        try {

            if( this.username.length > 0 ){

                let endpoint = `https://api.github.com/repos/${this.username}/${repo_name}/languages`;
    
                let { data } = await axios.get( endpoint );
    
                return {
                    success: true,
                    metadata: data
                }
    
            } else {
    
                return {
                    success: false,
                    error: "Username is not defined"
                };
    
            }

        } catch ( e ) {

            return {
                success: false,
                error: e.message
            };

        }

    }

}

export default GithubLib;