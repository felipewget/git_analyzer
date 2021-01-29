export type dbUser = {
    _id?: string,
    name: string,
    email: string,
    password: string,
    balance: number,
    created_at: number,
    deleted_at: number|null
};

export type dbhistory = {
    _id?: string,
    user_id: string,
    search_type: "analyzer" | "github_user"
    term?: string,
    created_at: number
}

export type sessions = {
    _id?: string,
    user_id: string,
    auth_token: string,
    created_at: string,
    deleted_at: string|null
}

export type dbRepositorie = {
    _id?: string,
    user_id: string,
    git_user_id: number,
    repository_id: number,
    description?: string,
    html_url: string,
    language?: string,
    size?: number
    repository_created_at: string,
    repository_updated_at?: string,
    created_at: number
};

export type dbGitUser = {
    _id?: string,
    git_id: number,
    name: string,
    avatar: string|null,
}

export type dbuser_Gituser = {
    _id?: string,
    user_id: string,
    github_id: string,
    created: number,
}

