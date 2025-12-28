import { format } from 'sql-formatter'
import type { SqlQuery } from '@/types/sql'

export function generateSql(query: SqlQuery): string {
  let sql = 'SELECT '

  // SELECT字段
  if (query.fields.length === 0) {
    sql += '*'
  } else {
    sql += query.fields
      .map((field) => {
        const fieldName = field.table ? `${field.table}.${field.name}` : field.name
        return field.alias ? `${fieldName} AS ${field.alias}` : fieldName
      })
      .join(', ')
  }

  // FROM子句
  if (query.tables.length > 0) {
    sql += `\nFROM ${query.tables[0].name}`
    if (query.tables[0].alias) {
      sql += ` AS ${query.tables[0].alias}`
    }
  }

  // JOIN子句
  query.joins.forEach((join) => {
    sql += `\n${join.type} JOIN ${join.table}`
    if (join.alias) {
      sql += ` AS ${join.alias}`
    }
    sql += ` ON ${join.on.leftField} = ${join.on.rightField}`
  })

  // WHERE子句
  if (query.conditions.length > 0) {
    sql += '\nWHERE '
    query.conditions.forEach((condition, index) => {
      if (index > 0 && condition.logic) {
        sql += ` ${condition.logic} `
      }
      sql += `${condition.field} ${condition.operator}`
      if (condition.operator !== 'IS NULL' && condition.operator !== 'IS NOT NULL') {
        if (condition.operator === 'IN') {
          sql += ` (${condition.value})`
        } else if (condition.operator === 'BETWEEN') {
          const [start, end] = condition.value.split(',')
          sql += ` ${start} AND ${end}`
        } else {
          sql += ` '${condition.value}'`
        }
      }
    })
  }

  // GROUP BY子句
  if (query.groupBy.length > 0) {
    sql += `\nGROUP BY ${query.groupBy.join(', ')}`
  }

  // ORDER BY子句
  if (query.orderBy.length > 0) {
    sql += '\nORDER BY '
    sql += query.orderBy
      .map((order) => `${order.field} ${order.direction}`)
      .join(', ')
  }

  // LIMIT子句
  if (query.limit) {
    sql += `\nLIMIT ${query.limit}`
  }

  return sql
}

export function formatSql(sql: string): string {
  try {
    return format(sql, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
    })
  } catch (error) {
    return sql
  }
}

