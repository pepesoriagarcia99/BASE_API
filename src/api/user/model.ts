import bcrypt from 'bcrypt'

export enum Role {
    admin = 'admin',
    administrative = 'administrative',
    commercial = 'commercial'
}

class User {
    _id?: string;

    name: string;

    password?: string;

    role: Role;

    constructor(_id: string | undefined, name: string, password: string, role: Role) {
        this._id = _id;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    authenticate(password: string): Promise<User | undefined> {
        if(!this.password) {
            return Promise.resolve(undefined);
        }

        return bcrypt.compare(password, this.password).then((valid) => {
            if(valid) {
                this.password = undefined;
                return this;
            }
            return undefined;
        })
    }

    #setPassword(password: string): string {
        try {
            return bcrypt.hashSync(password, 9);
        } catch (err) {
            throw new Error('Error setting password');
        }
    }

    preSave(): void {
        if(this.password) {
            this.password = this.#setPassword(this.password);
        }
    }

    get id(): string | undefined {
        return this._id;
    }
}

export default User;
