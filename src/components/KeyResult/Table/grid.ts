type Column = 'title' | 'objective' | 'confidence' | 'progress' | 'cycle' | 'owner'

type TableGridHashmap = Record<Column, string>

const grid: TableGridHashmap = {
  title: '24%',
  objective: '20%',
  confidence: '20%',
  progress: '20%',
  cycle: '10%',
  owner: '5%',
  // Must sum 99%, since the DraggableHandler consumes 1%
}

export default grid
