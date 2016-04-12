#!/usr/bin/env bats

@test "It should respond with HTTP 200 Okay" {
	sleep 1m
	run curl --write-out "%{http_code}\n" --silent --output /dev/null localhost:2368
	[[ "$output" =~ "200" ]]
}
