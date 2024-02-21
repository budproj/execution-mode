export enum KEY_RESULT_FORMAT {
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  COIN_BRL = 'COIN_BRL',
  COIN_USD = 'COIN_USD',
  COIN_EUR = 'COIN_EUR',
  COIN_GBP = 'COIN_GBP',
}

export enum KEY_RESULT_TYPE {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export enum KEY_RESULT_MODE {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export enum COMMENT_TYPE {
  SUGGESTION = 'suggestion',
  PRAISAL = 'praisal',
  QUESTION = 'question',
  ALIGNMENT = 'alignment',
  IMPROVEMENT = 'improvement',
  ISSUE = 'issue',
  COMMENT = 'comment',
}

export enum AUTHOR_TYPE {
  USER = 'USER',
  WORKER = 'WORKER',
  LLM = 'LLM',
}

export enum KEY_RESULT_PATCHS_KEYS {
  mode = 'mode',
  title = 'title',
  goal = 'goal',
  initialValue = 'initialValue',
  format = 'format',
  type = 'type',
  ownerId = 'ownerId',
  description = 'description',
  createdTask = 'createdTask',
  status = 'status',
}
