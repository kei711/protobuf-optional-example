/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';


export interface Ping {
  type: string;
  payload?: string | undefined;
}

export interface Pong {
  payload?: string | undefined;
}

const basePing: object = {
  type: "",
};

const basePong: object = {
};

export interface PingPong {

  sendPing(request: Ping): Promise<Pong>;

}

export class PingPongClientImpl implements PingPong {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  sendPing(request: Ping): Promise<Pong> {
    const data = Ping.encode(request).finish();
    const promise = this.rpc.request("pingpong.PingPong", "sendPing", data);
    return promise.then(data => Pong.decode(new Reader(data)));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

export const protobufPackage = 'pingpong'

export const Ping = {
  encode(message: Ping, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    if (message.payload !== undefined) {
      writer.uint32(18).string(message.payload);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Ping {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePing } as Ping;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.payload = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Ping {
    const message = { ...basePing } as Ping;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = String(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Ping>): Ping {
    const message = { ...basePing } as Ping;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = undefined;
    }
    return message;
  },
  toJSON(message: Ping): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.payload !== undefined && (obj.payload = message.payload);
    return obj;
  },
};

export const Pong = {
  encode(message: Pong, writer: Writer = Writer.create()): Writer {
    if (message.payload !== undefined) {
      writer.uint32(10).string(message.payload);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Pong {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePong } as Pong;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Pong {
    const message = { ...basePong } as Pong;
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = String(object.payload);
    } else {
      message.payload = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Pong>): Pong {
    const message = { ...basePong } as Pong;
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = undefined;
    }
    return message;
  },
  toJSON(message: Pong): unknown {
    const obj: any = {};
    message.payload !== undefined && (obj.payload = message.payload);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;