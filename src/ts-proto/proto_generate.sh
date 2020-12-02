#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}" || exit

DEST_DIR=./generated
rm -rf ${DEST_DIR}
mkdir -p ${DEST_DIR}

"$(yarn bin)"/grpc_tools_node_protoc \
--plugin="$(yarn bin)/protoc-gen-ts_proto" \
--ts_proto_out="${DEST_DIR}" \
--ts_proto_opt="lowerCaseServiceMethods=true" \
--experimental_allow_proto3_optional \
-I ../ ../pingpong.proto
