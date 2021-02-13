import enzyme from 'enzyme'
import faker from 'faker'
import { NextRouter } from 'next/dist/next-server/lib/router/router'
import * as router from 'next/router'
import React from 'react'
import sinon from 'sinon'

import Breadcrumb from './breadcrumb'

describe('component rendering expectations', () => {
  const numberBlocks = faker.random.number({ min: 2, max: 10 })
  const fakeRouter = {
    pathname: [...new Array(numberBlocks)].map(() => faker.random.word()).join('/'),
  }

  afterEach(() => sinon.restore())

  it('renders a single block for each "/" block in URL', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('IntlLink')

    expect(blocks.length).toEqual(numberBlocks)
  })

  it('adds a link for each block with the relative path to that block', () => {
    const fakeRouter = {
      pathname: '/rick/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('IntlLink')
    const expectedRelativeLinkForIndex: Record<number, string> = {
      0: '/rick',
      1: '/rick/morty',
    }

    blocks.map((block, index) => {
      return expect(block.prop('href')).toEqual(expectedRelativeLinkForIndex[index])
    })
  })

  it('uses the IntlLink for block links', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const intlLinkNodes = result.find('IntlLink')

    expect(intlLinkNodes.length).toEqual(numberBlocks)
  })

  it('highlights the last element in the breadcrumb as the current page', () => {
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const lastBreadcrumb = result.find('IntlLink').last().parent()

    expect(lastBreadcrumb.prop('isCurrentPage')).toEqual(true)
  })

  it('renders each block label as their path if no intl message exists', () => {
    const fakeRouter = {
      pathname: '/rick/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('IntlLink')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      0: 'Rick',
      1: 'Morty',
    }

    blocks.map((block, index) => {
      return expect(block.prop('children')).toEqual(expectedRelativeLabelForIndex[index])
    })
  })

  it('renders the proper Intl message label for a given block if exists', () => {
    const fakeRouter = {
      pathname: '/key-results/morty',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('IntlLink')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      0: 'Minhas Key Result',
      1: 'Morty',
    }

    blocks.map((block, index) => {
      return expect(block.prop('children')).toEqual(expectedRelativeLabelForIndex[index])
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

    const blocks = result.find('IntlLink')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      0: 'Minhas Key Result',
      1: 'Morty',
      2: fakeDynamicParameters.id,
    }

    blocks.map((block, index) => {
      return expect(block.prop('children')).toEqual(expectedRelativeLabelForIndex[index])
    })
  })

  it('renders the dynamic step name normalized if no dynamic data was provided', () => {
    const fakeRouter = {
      pathname: '/key-results/morty/[id]',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb />)

    const blocks = result.find('IntlLink')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      0: 'Minhas Key Result',
      1: 'Morty',
      2: 'Id',
    }

    blocks.map((block, index) => {
      return expect(block.prop('children')).toEqual(expectedRelativeLabelForIndex[index])
    })
  })
})

describe('corner cases', () => {
  it('capitalizes correctly dynamic routes with & special character', () => {
    const fakeRouter = {
      pathname: '/key-results/morty/[id]',
    }
    const fakeDynamicParameters = {
      id: 'M&G',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as NextRouter)

    const result = enzyme.shallow(<Breadcrumb routeParams={fakeDynamicParameters} />)

    const blocks = result.find('IntlLink')
    const expectedRelativeLabelForIndex: Record<number, string> = {
      0: 'Minhas Key Result',
      1: 'Morty',
      2: 'M&G',
    }

    blocks.map((block, index) => {
      return expect(block.prop('children')).toEqual(expectedRelativeLabelForIndex[index])
    })
  })
})
