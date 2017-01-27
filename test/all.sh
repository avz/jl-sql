#!/bin/sh

repeat() {
	# `yes` has strange behaviour in OSX: SIGPIPE is ignored eventually
	n=$1
	string=$2

	awk 'BEGIN { for (i = 0; i < ARGV[1]; i++) print ARGV[2]; }' "$n" "$string"
}

[ "$(repeat 100000 '{"hello":"world"}' | ./bin/jl-sql 'SELECT COUNT(*) AS c GROUP BY hello')" = '{"c":100000}' ] || exit 1
[ "$(repeat 10 '{"hello":"world"}' | ./bin/jl-sql 'SELECT COUNT(*) AS c GROUP BY hello')" = '{"c":10}' ] || exit 2
