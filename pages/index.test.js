/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Index from './index.js'

it('Index renders correctly', () => {
  const component = renderer.create(<Index />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})