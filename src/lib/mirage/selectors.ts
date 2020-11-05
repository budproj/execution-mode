import faker from 'faker'

export const pickRandom = (schema: Record<string, unknown>): Record<string, unknown> => {
  const length = schema.all().length
  const picked = faker.random.number(length - 1)

  return schema.find(picked)
}
