/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.9.1.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as addAssignment from "../addAssignment";
import type * as deleteAssignment from "../deleteAssignment";
import type * as http from "../http";
import type * as listAssignments from "../listAssignments";
import type * as replaceAssignment from "../replaceAssignment";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  addAssignment: typeof addAssignment;
  deleteAssignment: typeof deleteAssignment;
  http: typeof http;
  listAssignments: typeof listAssignments;
  replaceAssignment: typeof replaceAssignment;
}>;