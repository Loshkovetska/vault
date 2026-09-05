import {
  FastifyBaseLogger,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider.js";
import { IncomingMessage } from "http";

export type ReqParams = Record<string, any>;
export type APIRequest = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  IncomingMessage,
  FastifySchema,
  FastifyTypeProviderDefault,
  unknown,
  FastifyBaseLogger,
  ResolveFastifyRequestType<
    FastifyTypeProviderDefault,
    FastifySchema,
    RouteGenericInterface
  >
>;
