import { TreeMenuNode } from "../side-menu-tree/tree-menu-node.model";

export interface User {
    _id: number;
    name: string;
    role?:   number;
    profile?:  number;
    is_domain?:boolean;
    login?:    string;
    password?: string;
}

//----------------------------
export interface UserResponse {
    data:  User;
}

export interface RoleResponse {
    data:  Role;
}

export interface ProfileResponse {
    data:  Profile;
}


export interface UsersPage {
    skip:  number;
    limit: string;
    total: number;
    data:  User[];
}


export interface Role {
    _id:        number;
    name:       string;
    full_name?:  string;
}

export interface Profile {
    _id:        number;    
    side_menu?:  TreeMenuNode[];
    name:       string;
}

export interface UsersState {
    selectedUser?: User;
    usersPage?: UsersPage;
    selectedPage: number;
    rolesSelector: Role[];
    profilesSelector: Profile[];
    pageSize: number;
    role?: Role,
    profile?: Profile
  }