import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { objectiveAtomFamily } from '../../../state/recoil/objective'
import { Objective } from '../../Objective/types'

export interface TeamActiveObjectivesProperties {
  teamID: string
}

// Export interface GetTeamAndChildTeamsObjectivesQuery {
//   team: Partial<Team>
// }
//
// const hasObjectives = (team?: Partial<Team>) =>
//   team?.objectives && team.objectives.edges.length > 0 && true
//
// const mergeObjectives = (rootObjectives: Objective[], childObjectives: Objective[]) => {
//   if (!rootObjectives && !childObjectives) return
//
//   const flattenedList = flatten([...rootObjectives, ...childObjectives])
//   const uniqObjectives = uniq(flattenedList)
//   const clearedObjectives = remove(uniqObjectives)
//
//   return clearedObjectives
// }

export const TeamActiveObjectives = ({ teamID }: TeamActiveObjectivesProperties) => {
  const loadObjectivesOnRecoil = useRecoilFamilyLoader<Objective>(objectiveAtomFamily)
  // Const { data, loading } = useQuery<GetTeamAndChildTeamsObjectivesQuery>(
  //   queries.GET_TEAM_AND_CHILD_TEAMS_OBJECTIVES,
  //   {
  //     variables: { rootTeamId },
  //   },
  // )
  // Const [teamObjectives, setTeamObjectiveEdges] = useConnectionEdges<Objective>()
  // const [childTeams, setChildTeamEdges] = useConnectionEdges<Team>()
  // const [childTeamObjectives, setChildTeamObjectiveEdges] = useConnectionEdges<Objective>()
  //
  // const objectives = mergeObjectives(teamObjectives, childTeamObjectives)
  // const isLoaded = Boolean(data?.team?.teams)
  //
  // useEffect(() => {
  //   if (!loading && data && objectives) loadObjectivesOnRecoil(objectives)
  // }, [objectives, data, loading, loadObjectivesOnRecoil])
  //
  // useEffect(() => {
  //   if (data) {
  //     const { team } = data
  //     const { teams } = team
  //
  //     const rawRootObjectives = team.objectives?.edges
  //     const rawChildObjectives = teams?.edges.map((edge) => edge.node.objectives?.edges)
  //     const flattenedChildObjectives = flatten(rawChildObjectives)
  //     const nonUndefinedChildObjectives = remove<GraphQLEdge<Objective>>(
  //       flattenedChildObjectives as any,
  //     )
  //
  //     setTeamObjectiveEdges(rawRootObjectives)
  //     setChildTeamEdges(teams?.edges)
  //     setChildTeamObjectiveEdges(nonUndefinedChildObjectives)
  //   }
  // }, [data, setTeamObjectiveEdges, setChildTeamEdges, setChildTeamObjectiveEdges])
  //
  // return (
  //   <Flex gridGap={4} direction="column">
  //     {isLoaded ? (
  //       <>
  //         {hasObjectives(data?.team) && (
  //           <ObjectiveGroup
  //             groupTitle={data?.team.name}
  //             objectiveIDs={teamObjectives.map((objective) => objective.id)}
  //           />
  //         )}
  //
  //         {childTeams?.map(
  //           (childTeam) =>
  //             hasObjectives(childTeam) && (
  //               <ObjectiveGroup
  //                 key={childTeam.id ?? uniqueId()}
  //                 groupTitle={childTeam.name}
  //                 objectiveIDs={childTeam.objectives?.edges.map((edge) => edge.node.id)}
  //               />
  //             ),
  //         )}
  //       </>
  //     ) : (
  //       <ChildTeamsObjectivesSkeleton />
  //     )}
  //   </Flex>
  // )
  return <p>{teamID}</p>
}
