import { mirageGraphQLFieldResolver } from '@miragejs/graphql'


// AKA: the ignorant resolver 
// use case: when your request is a query and mirage does not need to care about the arguments,
// you can just show all results instead
export const ignoreArguments = (parent: any, functionArgs: any, context: any, info: any) =>
  mirageGraphQLFieldResolver(parent, {}, context, info)
