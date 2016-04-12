#!/usr/bin/env bats

@test "It should respond with HTTP 200 Okay" {
	run curl --write-out "%{http_code}\n" --silent --output /dev/null 127.0.0.1:2368
	[[ "$output" =~ "200" ]]
}
