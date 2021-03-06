#!/bin/sh

cd "$(dirname "$0")/../.."

repeat() {
	# `yes` has strange behaviour in OSX: SIGPIPE is ignored eventually
	n=$1
	string=$2

	awk 'BEGIN { for (i = 0; i < ARGV[1]; i++) print ARGV[2]; }' "$n" "$string"
}

cmd=./bin/jl-sql
[ "$(repeat 100000 '{"hello":"world"}' | $cmd 'SELECT COUNT(*) AS c GROUP BY hello')" = '{"c":100000}' ] || exit 1
[ "$(repeat 10 '{"hello":"world"}' | $cmd 'SELECT COUNT(*) AS c GROUP BY hello')" = '{"c":10}' ] || exit 2
[ "$(repeat 10 '{"hello":"world"}' | $cmd 'SELECT COUNT(*) AS c FROM `/dev/stdin` GROUP BY hello')" = '{"c":10}' ] || exit 3
[ "$(repeat 10 '{"hello":"world"}{"hello":"world"}' | $cmd 'SELECT COUNT(*) AS c GROUP BY hello')" = '{"c":20}' ] || exit 4
[ "$(repeat 10 '{"hello":"world"}{"hello":"world"}' | $cmd 'SELECT COUNT(*) AS c FROM `/dev/stdin` GROUP BY hello')" = '{"c":20}' ] || exit 5
