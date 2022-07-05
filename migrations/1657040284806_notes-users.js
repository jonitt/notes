exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(1000)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },
    date: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('notes', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    note: { type: 'varchar(3000)', notNull: true },
    info: { type: 'varchar(1000)', notNull: true },
    date: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  })
}
