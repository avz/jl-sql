## `v1.5.0` (2017-02-12)

* CSV speedup (migration to `@avz/csv` parser)

## `v1.4.0` (2017-02-12)

* aliases now accessible in WHERE and GROUP BY:
  - `SELECT field AS alias WHERE alias = 123`
  - `SELECT field AS alias GROUP BY alias`

## `v1.3.0` (2017-02-10)

* CSV support: ``SELECT * FROM CSV(`/path/to/file.csv`, {delimiter: ";"})``

## `v1.2.0` (2017-01-20)

* LIKE and ILIKE (case-insensitive LIKE) was added
* Automatical type coercion in date comparisons like `ts > NOW() - INTERVAL 1 DAY`
* Option `--version`


## `v1.1.0` (2017-01-19)

* `SELECT ... FROM dataSource` support
* JSON objects can now be created as `{key: "value"}` not only JSON-compliant form `{"key": "value"}`
