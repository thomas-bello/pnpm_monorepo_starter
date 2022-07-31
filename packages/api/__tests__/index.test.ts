import { test, assert } from 'vitest'
import { _add } from '../index'

test('_add', () => {
  assert.equal(_add(1, 1), 2)
})
