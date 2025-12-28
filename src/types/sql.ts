export interface SqlTable {
  name: string
  alias?: string
  fields: SqlField[]
}

export interface SqlField {
  name: string
  alias?: string
  table?: string
}

export interface SqlCondition {
  id: string
  field: string
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'IN' | 'BETWEEN' | 'IS NULL' | 'IS NOT NULL'
  value: string
  logic?: 'AND' | 'OR'
}

export interface SqlJoin {
  id: string
  type: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL'
  table: string
  alias?: string
  on: {
    leftField: string
    rightField: string
  }
}

export interface SqlQuery {
  tables: SqlTable[]
  fields: SqlField[]
  conditions: SqlCondition[]
  joins: SqlJoin[]
  groupBy: string[]
  orderBy: {
    field: string
    direction: 'ASC' | 'DESC'
  }[]
  limit?: number
}

