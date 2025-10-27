import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'

import migrations from './migrations'
import Product from './models/products'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'watermelon-db',
  jsi: Platform.OS === 'ios',
  onSetUpError: error => {
    console.error(error)
  }
})

const database = new Database({
  adapter,
  modelClasses: [
    Product,
  ],
})

export default database