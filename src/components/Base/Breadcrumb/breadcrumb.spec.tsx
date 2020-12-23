import enzyme from 'enzyme'
import faker from 'faker'
import { startCase } from 'lodash'
import { NextRouter } from 'next/dist/next-server/lib/router/router'
import * as router from 'next/router'
import React from 'react'
import sinon from 'sinon'

import Breadcrumb from './breadcrumb'

describe('component rendering expectations', () => {
  const numberBlocks = faker.random.number({ max: 10 })
  const fakeRouter = {
    // eslint-disable-next-line unicorn/no-null
    pathname: new Array(numberBlocks).fill(null).map(faker.random.word).join('/'),
  }

  afterEach(() => sinon.restore())

  it('renders a single block for each "/" block in URL', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')

    expect(blocks.length).toEqual(numberBlocks + 1) // Added one since we manually adds the "Home" block
  })

  it('renders the first element as "Home"', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')
    const firstLabel = blocks.first().find('IntlLink').prop('children')

    expect(firstLabel).toEqual('Home')
  })

  it('adds a link for each block with the relative path to that block', () => {
    const fakeRouter = {
      pathname: '/rick/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')
    const expectedRelativeLinkForIndex: Record<number, string> = {
      1: '/rick',
      2: '/rick/morty',
    }

    blocks.map((block, index) => {
      if (index === 0) return // The first block is always "Home"

      const href = block.find('IntlLink').prop('href')
      return expect(href).toEqual(expectedRelativeLinkForIndex[index])
    })
  })

  it('uses the IntlLink for block links', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const intlLinkNodes = result.find('IntlLink')

    expect(intlLinkNodes.length).toEqual(numberBlocks + 1) // Added one since we manually adds the "Home" block
  })

  it('renders only "Home" if URL is "/"', () => {
    const fakeRouter = {
      pathname: '/',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')

    expect(blocks.length).toEqual(1)
  })

  it('highlights the last element in the breadcrumb as the current page', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const lastBreadcrumb = result.find('BreadcrumbItem').last()

    expect(lastBreadcrumb.prop('isCurrentPage')).toEqual(true)
  })

  it('renders each block label as their path if no intl message exists', () => {
    const fakeRouter = {
      pathname: '/rick/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      1: 'Rick',
      2: 'Morty',
    }

    blocks.map((block, index) => {
      if (index === 0) return // The first block is always "Home"

      const label = block.find('IntlLink').prop('children')
      return expect(label).toEqual(expectedRelativeLabelForIndex[index])
    })
  })

  it('renders the proper Intl message label for a given block if exists', () => {
    const fakeRouter = {
      pathname: '/key-results/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      1: 'Minhas Key Result',
      2: 'Morty',
    }

    blocks.map((block, index) => {
      if (index === 0) return // The first block is always "Home"

      const label = block.find('IntlLink').prop('children')
      return expect(label).toEqual(expectedRelativeLabelForIndex[index])
    })
  })

  it('renders a dynamic step with provided dynamic data', () => {
    const fakeRouter = {
      pathname: '/key-results/morty/[id]',
    }
    const fakeDynamicParameters = {
      id: faker.random.word(),
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb routeParams={fakeDynamicParameters} />)

    const blocks = result.find('BreadcrumbItem')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      1: 'Minhas Key Result',
      2: 'Morty',
      3: startCase(fakeDynamicParameters.id),
    }

    blocks.map((block, index) => {
      if (index === 0) return // The first block is always "Home"

      const label = block.find('IntlLink').prop('children')
      return expect(label).toEqual(expectedRelativeLabelForIndex[index])
    })
  })

  it('renders the dynamic step name normalized if no dynamic data was provided', () => {
    const fakeRouter = {
      pathname: '/key-results/morty/[id]',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('BreadcrumbItem')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      1: 'Minhas Key Result',
      2: 'Morty',
      3: 'Id',
    }

    blocks.map((block, index) => {
      if (index === 0) return // The first block is always "Home"

      const label = block.find('IntlLink').prop('children')
      return expect(label).toEqual(expectedRelativeLabelForIndex[index])
    })
  })
})
