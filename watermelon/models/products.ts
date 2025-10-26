import { Model } from '@nozbe/watermelondb'
import { field, text, date } from '@nozbe/watermelondb/decorators'

export default class Product extends Model {
  static table = 'products'

  @text('title') title!: string
  @field('price') price!: number
  @field('quantity') quantity!: number
  @date('created_at') createdAt!: Date
  @date('updated_at') updatedAt!: Date
}
