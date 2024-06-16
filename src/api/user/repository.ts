import DataStore from '../../services/nedb/DataStore';
import User from './model';

const ds = new DataStore(User);

ds.ensureIndex({ fieldName: 'name', unique: true });

export default ds;
