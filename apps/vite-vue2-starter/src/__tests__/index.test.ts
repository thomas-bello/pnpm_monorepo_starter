import { test, assert } from 'vitest'
import { add } from '../counter'

test('add', () => {
  assert.equal(add(1, 1), 2)
})
