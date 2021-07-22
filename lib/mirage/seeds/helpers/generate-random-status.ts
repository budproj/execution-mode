// type Status {
//   # The computed percentage current progress of this entity.The entity progress calculation vary based on the entity
// progress: Float!

//   # The computed current confidence of this entity.The confidence is always the lowest among the entity's children
// confidence: Int!

//   # This key defines if the given entity is active.An active entity definition varies according to the entity
// isActive: Boolean!

//   # This key defines if the given entity is outdated.By outdated we mean that it needs to receive a new report
// isOutdated: Boolean!

//   # The latest check -in date in this status
// reportDate: DateTime

//   # The latest check -in date in this status
// latestCheckIn: KeyResultCheckIn

// const FINISHED_STATUS = { progress: 100, confidence: 100, isActive: true, isOutdated: false }
const ALMOST_FINISHED_STATUS = { progress: 99, confidence: 99, isActive: true, isOutdated: false }
// const STARTED_STATUS = { progress: 30, confidence: 80, isActive: true, isOutdated: false }
// const OUTDATED_STATUS = { progress: 0, confidence: 0, isActive: true, isOutdated: true }

const possibleStatuses = [
  // FINISHED_STATUS,
  ALMOST_FINISHED_STATUS,
  // STARTED_STATUS,
  // OUTDATED_STATUS,
]

export const generateRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * possibleStatuses.length)
  return possibleStatuses[randomIndex]
}

console.log(generateRandomStatus())
