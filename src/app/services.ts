import { IUser } from '../interfaces/IUser';

const loginPath = process.env.REACT_APP_APIROUTE ? process.env.REACT_APP_APIROUTE + '/user/login' : '';
const profilePath = process.env.REACT_APP_APIROUTE ? process.env.REACT_APP_APIROUTE + '/user/profile' : '';

interface IFD<T> {
    body?: T;
    status?: number;
    message?: string;
}
export const dataFetch = <T>(url: string): Promise<IFD<T>> =>
    fetch(url).then<IFD<T>>((r) => r.json() as Promise<IFD<T>>);

export const dataPost = <T, D>(
    url: string,
    data: D,
    method: 'POST' | 'PUT' | 'DELETE' = 'POST',
    auth = '',
): Promise<IFD<T>> =>
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
        },
        body: JSON.stringify(data),
    }).then<IFD<T>>((r) => r.json() as Promise<IFD<T>>);

// A mock function to mimic making an async request for data
export const fetchToken = async (email?: string, password?: string): Promise<{ token: string } | undefined> => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const response = await dataPost<{ token: string }, { email: string; password: string }>(
        loginPath,
        { email, password },
        'POST',
    );
    return response.body;
};

export const fetchUser = async (token?: string): Promise<IUser | undefined> => {
    if (!token) {
        throw new Error('Token is required');
    }
    const response = await dataPost<IUser, undefined>(profilePath, undefined, 'POST', 'Bearer ' + token);
    return response.body;
};

export const updateUser = async (token?: string, user?: Partial<IUser>): Promise<IUser | undefined> => {
    if (!token || !user) {
        throw new Error('Token and user are required');
    }
    const response = await dataPost<IUser, Partial<IUser>>(profilePath, user, 'PUT', 'Bearer ' + token);
    return response.body;
};
