# `jl-sql`

CLI frontend for https://github.com/avz/node-jl-sql-api

## Examples

Test dataset

```
% cat data.json
```

```
{"key": 2, "value": 2}
{"key": 1, "value": 3}
{"key": 3, "value": 6}
{"key": 3, "value": 4}
{"key": 1, "value": 5}
{"value": 7}
{"key": null, "value": 8}
```

### `GROUP BY`

```
% cat data.json | jl-sql 'SELECT key, SUM(value) AS sum, COUNT(*) AS count GROUP BY key'
```

```
{"sum":7,"count":1}
{"key":1,"sum":8,"count":2}
{"key":2,"sum":2,"count":1}
{"key":3,"sum":10,"count":2}
{"key":null,"sum":8,"count":1}
```

### `ORDER BY`

```
% cat data.json | jl-sql 'SELECT * ORDER BY key'
```

```
{"value":7}
{"key":1,"value":3}
{"key":1,"value":5}
{"key":2,"value":2}
{"key":3,"value":6}
{"key":3,"value":4}
{"key":null,"value":8}
```

### `WHERE`

Use binding
```
cat data.json | jl-sql --bind :key=1 'SELECT * WHERE key = :key'
```

or same thing inline

```
cat data.json | jl-sql 'SELECT * WHERE key = 1'
```

will output

```
{"key":1,"value":3}
{"key":1,"value":5}
```

## Usage
```
% jl-sql --help
```

```
Usage: jl-sql [OPTIONS] SQL
OPTIONS:
  -h, --help                               show this help
  -I, --ignore-json-error                  ignore broken JSON
  -v, --verbose                            display additional information
  -S, --sort-external-buffer-size=SIZE     use SIZE bytes for `sort` memory buffer
  -B, --sort-in-memory-buffer-length=ROWS  save up to ROWS rows for in-memory sort
  -T, --temporary-directory=DIR            use DIR for temporaries, not $TMPDIR or /tmp
  -b, --bind=BIND=VALUE+                   bind valiable

See full documentation at https://github.com/avz/jl-sql
```
