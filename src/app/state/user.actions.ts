import { createAction, props } from '@ngrx/store';
import { Profile, Role, User, UsersPage } from '../features/login/user.model';


export const getUserById = createAction(
    '[User] Get by id',
    props<{ id: number}>()
);

export const getUserByIdOk = createAction(
    '[User] Get by id Ok',
    props<{ user: User}>()
);

export const getUserByIdError = createAction(
    '[User] Get by id Error',
    props<{error: Error}>()
);


export const editUser = createAction(
    '[User] Edit user',
    props<{user: User}>()
);

export const editUserOk = createAction(
    '[User] Edit user Ok',
    props<{ user: User}>()
);

export const editUserError = createAction(
    '[User] Edit user Error',
    props<{error: Error}>()
);

export const loadUserPage = createAction(
    '[User] Load users page',
    props<{ skip: number, limit:number}>()
);

export const loadUserPageOk = createAction(
    '[User] Load users page Ok',
    props<{ userPage: UsersPage}>()
);

export const loadUserPageError = createAction(
    '[User] Load users page Error',
    props<{ error: Error}>()
);

export const createUser = createAction(
    '[User] Create user',
    props<{user: User}>()
);

export const fillRolesSelector = createAction(
    '[User] Fill roles selector',
    //props<{ }>()
);

export const fillProfilesSelector = createAction(
    '[User] Fill profiles selector',
    //props<{ }>()
);

export const fillRolesSelectorOK = createAction(
    '[User] Fill roles selector Ok',
    props<{ roles: Role[]}>()
);

export const fillProfilesSelectorOk = createAction(
    '[User] Fill profiles selector Ok',
    props<{ profiles: Profile[]}>()
);