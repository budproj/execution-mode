type Column = 'title' | 'objective' | 'confidence' | 'progress' | 'cycle' | 'owner'

type TableGridHashmap = Record<Column, string>

const grid: TableGridHashmap = {
  title: '25%',
  objective: '20%',
  confidence: '20%',
  progress: '20%',
  cycle: '10%',
  owner: '5%',
}

export default grid
