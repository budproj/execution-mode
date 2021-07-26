import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { omit } from 'lodash'

// AKA: the ignorant resolver
// use case: when your request is a query and mirage does not need to care about the arguments,
// you can just show all results instead
export const ignoreArguments = (parent: any, functionArguments: any, context: any, info: any) =>
  mirageGraphQLFieldResolver(parent, {}, context, info)

// AKA: the ignorant specific resolver
// use case: when your request is a query and mirage should not care about an array of arguments.
// example: an X argument is not necessary, so use ignoreSpecificArgments(['X'])
export const ignoreSpecificArgments =
  (argumentsToIgnore: string[]) =>
  (parent: any, functionArguments: any, context: any, info: any) => {
    const functionArgumentsWithIgnoredArguments = omit(functionArguments, argumentsToIgnore)

    return mirageGraphQLFieldResolver(parent, functionArgumentsWithIgnoredArguments, context, info)
  }
