# `jl-sql` - SQL for JSON and CSV files

CLI frontend for https://github.com/avz/node-jl-sql-api

* [Installation](#installation)
* [Examples](#examples)
  * [`GROUP BY`](#group-by)
  * [`ORDER BY`](#order-by)
  * [`WHERE`](#where)
  * [`JOIN`](#join)
* [CSV support](#csv-support)
* [Usage](#usage)

## Installation

**Warning: Node.js v6+ required**

```
% sudo npm install -g jl-sql
```

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
% cat data.json | jl-sql --bind :key=1 'SELECT * WHERE key = :key'
```

or same thing inline

```
% cat data.json | jl-sql 'SELECT * WHERE key = 1'
```

will output

```
{"key":1,"value":3}
{"key":1,"value":5}
```

### `JOIN`

We will need 2 files

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

```
% cat keyInfo.json
```

```
{"key": 1, "title": "first"}
{"key": 2, "title": "second"}
{"key": 3, "title": "third"}
```

```
% cat data.json | jl-sql --bind :info=keyInfo.json 'SELECT key, @info.title LEFT JOIN {:info} ON @info.key = key'
```

```
{}
{"key":1,"title":"first"}
{"key":1,"title":"first"}
{"key":2,"title":"second"}
{"key":3,"title":"third"}
{"key":3,"title":"third"}
{"key":null}
```

## CSV support

```
% cat data.json
```

```
key,value
2,2
1,3
3,6
3,4
1,5
,7
```

From stdin:
```
cat data.csv | jl-sql 'SELECT * FROM CSV(STDIN())'
```

From file:
```
jl-sql -b :data=data.csv 'SELECT * FROM CSV({:data})'
```

Output:
```
{"key":"2","value":"2"}
{"key":"1","value":"3"}
{"key":"3","value":"6"}
{"key":"3","value":"4"}
{"key":"1","value":"5"}
{"key":"","value":"7"}
```

### Options

You can customize parsing by options:

```
cat data.csv | jl-sql 'SELECT * FROM CSV(STDIN(), {columns: ["a", "b"], encoding: "cp1251"})'
```

```
{"a":"key","b":"value"}
{"a":"2","b":"2"}
{"a":"1","b":"3"}
{"a":"3","b":"6"}
{"a":"3","b":"4"}
{"a":"1","b":"5"}
{"a":"","b":"7"}
```

List of available options:

 - `detectTypes` - if `true`, the parser will attempt to convert input string to native types
 - `detectDates` - if `true`, the parser will attempt to convert input string to dates. It requires the "auto_parse" option
 - `columns` - list of fields as an array. By default autodiscovered in the first CSV line
 - `delimiter` - field delimiter, one character only. Defaults to `,` (comma)
 - `escape` - escape character, one character only. Defaults to `"` (double quote)
 - `ltrim` - if `true`, ignore whitespace immediately following the delimiter. Does not remove whitespace in a quoted field.
 - `rtrim` - if `true`, ignore whitespace immediately preceding the delimiter. Does not remove whitespace in a quoted field.
 - `skipEmptyLines` - Don't generate records for lines containing empty column values (column matching `/\s*/`). Disable by default
 - `encoding` - input encoding

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
