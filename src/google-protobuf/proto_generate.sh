#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}" || exit

DEST_DIR=./generated
rm -rf ${DEST_DIR}
mkdir -p ${DEST_DIR}

"$(yarn bin)"/grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:${DEST_DIR} \
--experimental_allow_proto3_optional \
-I ../ ../pingpong.proto
