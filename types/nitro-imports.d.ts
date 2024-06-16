declare global {
  const __buildAssetsURL: typeof import('../node_modules/nuxt/dist/core/runtime/nitro/paths')['buildAssetsURL']
  const __publicAssetsURL: typeof import('../node_modules/nuxt/dist/core/runtime/nitro/paths')['publicAssetsURL']
  const appendCorsHeaders: typeof import('../node_modules/h3')['appendCorsHeaders']
  const appendCorsPreflightHeaders: typeof import('../node_modules/h3')['appendCorsPreflightHeaders']
  const appendHeader: typeof import('../node_modules/h3')['appendHeader']
  const appendHeaders: typeof import('../node_modules/h3')['appendHeaders']
  const appendResponseHeader: typeof import('../node_modules/h3')['appendResponseHeader']
  const appendResponseHeaders: typeof import('../node_modules/h3')['appendResponseHeaders']
  const assertMethod: typeof import('../node_modules/h3')['assertMethod']
  const cachedEventHandler: typeof import('../node_modules/nitropack/dist/runtime')['cachedEventHandler']
  const cachedFunction: typeof import('../node_modules/nitropack/dist/runtime')['cachedFunction']
  const callNodeListener: typeof import('../node_modules/h3')['callNodeListener']
  const clearResponseHeaders: typeof import('../node_modules/h3')['clearResponseHeaders']
  const clearSession: typeof import('../node_modules/h3')['clearSession']
  const createApp: typeof import('../node_modules/h3')['createApp']
  const createAppEventHandler: typeof import('../node_modules/h3')['createAppEventHandler']
  const createError: typeof import('../node_modules/h3')['createError']
  const createEvent: typeof import('../node_modules/h3')['createEvent']
  const createEventStream: typeof import('../node_modules/h3')['createEventStream']
  const createRouter: typeof import('../node_modules/h3')['createRouter']
  const defaultContentType: typeof import('../node_modules/h3')['defaultContentType']
  const defineAppConfig: typeof import('../node_modules/nuxt/dist/core/runtime/nitro/config')['defineAppConfig']
  const defineCachedEventHandler: typeof import('../node_modules/nitropack/dist/runtime')['defineCachedEventHandler']
  const defineCachedFunction: typeof import('../node_modules/nitropack/dist/runtime')['defineCachedFunction']
  const defineEventHandler: typeof import('../node_modules/h3')['defineEventHandler']
  const defineLazyEventHandler: typeof import('../node_modules/h3')['defineLazyEventHandler']
  const defineNitroErrorHandler: typeof import('../node_modules/nitropack/dist/runtime')['defineNitroErrorHandler']
  const defineNitroPlugin: typeof import('../node_modules/nitropack/dist/runtime')['defineNitroPlugin']
  const defineNodeListener: typeof import('../node_modules/h3')['defineNodeListener']
  const defineNodeMiddleware: typeof import('../node_modules/h3')['defineNodeMiddleware']
  const defineRenderHandler: typeof import('../node_modules/nitropack/dist/runtime')['defineRenderHandler']
  const defineRequestMiddleware: typeof import('../node_modules/h3')['defineRequestMiddleware']
  const defineResponseMiddleware: typeof import('../node_modules/h3')['defineResponseMiddleware']
  const defineTask: typeof import('../node_modules/nitropack/dist/runtime')['defineTask']
  const defineWebSocket: typeof import('../node_modules/h3')['defineWebSocket']
  const defineWebSocketHandler: typeof import('../node_modules/h3')['defineWebSocketHandler']
  const deleteCookie: typeof import('../node_modules/h3')['deleteCookie']
  const dynamicEventHandler: typeof import('../node_modules/h3')['dynamicEventHandler']
  const eventHandler: typeof import('../node_modules/h3')['eventHandler']
  const fetchWithEvent: typeof import('../node_modules/h3')['fetchWithEvent']
  const fromNodeMiddleware: typeof import('../node_modules/h3')['fromNodeMiddleware']
  const fromPlainHandler: typeof import('../node_modules/h3')['fromPlainHandler']
  const fromWebHandler: typeof import('../node_modules/h3')['fromWebHandler']
  const getCookie: typeof import('../node_modules/h3')['getCookie']
  const getHeader: typeof import('../node_modules/h3')['getHeader']
  const getHeaders: typeof import('../node_modules/h3')['getHeaders']
  const getMethod: typeof import('../node_modules/h3')['getMethod']
  const getProxyRequestHeaders: typeof import('../node_modules/h3')['getProxyRequestHeaders']
  const getQuery: typeof import('../node_modules/h3')['getQuery']
  const getRequestFingerprint: typeof import('../node_modules/h3')['getRequestFingerprint']
  const getRequestHeader: typeof import('../node_modules/h3')['getRequestHeader']
  const getRequestHeaders: typeof import('../node_modules/h3')['getRequestHeaders']
  const getRequestHost: typeof import('../node_modules/h3')['getRequestHost']
  const getRequestIP: typeof import('../node_modules/h3')['getRequestIP']
  const getRequestPath: typeof import('../node_modules/h3')['getRequestPath']
  const getRequestProtocol: typeof import('../node_modules/h3')['getRequestProtocol']
  const getRequestURL: typeof import('../node_modules/h3')['getRequestURL']
  const getRequestWebStream: typeof import('../node_modules/h3')['getRequestWebStream']
  const getResponseHeader: typeof import('../node_modules/h3')['getResponseHeader']
  const getResponseHeaders: typeof import('../node_modules/h3')['getResponseHeaders']
  const getResponseStatus: typeof import('../node_modules/h3')['getResponseStatus']
  const getResponseStatusText: typeof import('../node_modules/h3')['getResponseStatusText']
  const getRouteRules: typeof import('../node_modules/nitropack/dist/runtime')['getRouteRules']
  const getRouterParam: typeof import('../node_modules/h3')['getRouterParam']
  const getRouterParams: typeof import('../node_modules/h3')['getRouterParams']
  const getSession: typeof import('../node_modules/h3')['getSession']
  const getValidatedQuery: typeof import('../node_modules/h3')['getValidatedQuery']
  const getValidatedRouterParams: typeof import('../node_modules/h3')['getValidatedRouterParams']
  const handleCacheHeaders: typeof import('../node_modules/h3')['handleCacheHeaders']
  const handleCors: typeof import('../node_modules/h3')['handleCors']
  const isCorsOriginAllowed: typeof import('../node_modules/h3')['isCorsOriginAllowed']
  const isError: typeof import('../node_modules/h3')['isError']
  const isEvent: typeof import('../node_modules/h3')['isEvent']
  const isEventHandler: typeof import('../node_modules/h3')['isEventHandler']
  const isMethod: typeof import('../node_modules/h3')['isMethod']
  const isPreflightRequest: typeof import('../node_modules/h3')['isPreflightRequest']
  const isStream: typeof import('../node_modules/h3')['isStream']
  const isWebResponse: typeof import('../node_modules/h3')['isWebResponse']
  const lazyEventHandler: typeof import('../node_modules/h3')['lazyEventHandler']
  const nitroPlugin: typeof import('../node_modules/nitropack/dist/runtime')['nitroPlugin']
  const parseCookies: typeof import('../node_modules/h3')['parseCookies']
  const pathForRedirect: typeof import('../utils/normalize-path')['default']
  const promisifyNodeListener: typeof import('../node_modules/h3')['promisifyNodeListener']
  const proxyRequest: typeof import('../node_modules/h3')['proxyRequest']
  const readBody: typeof import('../node_modules/h3')['readBody']
  const readFormData: typeof import('../node_modules/h3')['readFormData']
  const readMultipartFormData: typeof import('../node_modules/h3')['readMultipartFormData']
  const readRawBody: typeof import('../node_modules/h3')['readRawBody']
  const readValidatedBody: typeof import('../node_modules/h3')['readValidatedBody']
  const removeResponseHeader: typeof import('../node_modules/h3')['removeResponseHeader']
  const runTask: typeof import('../node_modules/nitropack/dist/runtime')['runTask']
  const sanitizeStatusCode: typeof import('../node_modules/h3')['sanitizeStatusCode']
  const sanitizeStatusMessage: typeof import('../node_modules/h3')['sanitizeStatusMessage']
  const sealSession: typeof import('../node_modules/h3')['sealSession']
  const send: typeof import('../node_modules/h3')['send']
  const sendError: typeof import('../node_modules/h3')['sendError']
  const sendIterable: typeof import('../node_modules/h3')['sendIterable']
  const sendNoContent: typeof import('../node_modules/h3')['sendNoContent']
  const sendProxy: typeof import('../node_modules/h3')['sendProxy']
  const sendRedirect: typeof import('../node_modules/h3')['sendRedirect']
  const sendStream: typeof import('../node_modules/h3')['sendStream']
  const sendWebResponse: typeof import('../node_modules/h3')['sendWebResponse']
  const serveStatic: typeof import('../node_modules/h3')['serveStatic']
  const setCookie: typeof import('../node_modules/h3')['setCookie']
  const setHeader: typeof import('../node_modules/h3')['setHeader']
  const setHeaders: typeof import('../node_modules/h3')['setHeaders']
  const setResponseHeader: typeof import('../node_modules/h3')['setResponseHeader']
  const setResponseHeaders: typeof import('../node_modules/h3')['setResponseHeaders']
  const setResponseStatus: typeof import('../node_modules/h3')['setResponseStatus']
  const splitCookiesString: typeof import('../node_modules/h3')['splitCookiesString']
  const toEventHandler: typeof import('../node_modules/h3')['toEventHandler']
  const toNodeListener: typeof import('../node_modules/h3')['toNodeListener']
  const toPlainHandler: typeof import('../node_modules/h3')['toPlainHandler']
  const toWebHandler: typeof import('../node_modules/h3')['toWebHandler']
  const toWebRequest: typeof import('../node_modules/h3')['toWebRequest']
  const unsealSession: typeof import('../node_modules/h3')['unsealSession']
  const updateSession: typeof import('../node_modules/h3')['updateSession']
  const useAppConfig: typeof import('../node_modules/nitropack/dist/runtime')['useAppConfig']
  const useBase: typeof import('../node_modules/h3')['useBase']
  const useDatabase: typeof import('../node_modules/nitropack/dist/runtime/database')['useDatabase']
  const useEvent: typeof import('../node_modules/nitropack/dist/runtime')['useEvent']
  const useNitroApp: typeof import('../node_modules/nitropack/dist/runtime')['useNitroApp']
  const useRuntimeConfig: typeof import('../node_modules/nitropack/dist/runtime')['useRuntimeConfig']
  const useSession: typeof import('../node_modules/h3')['useSession']
  const useStorage: typeof import('../node_modules/nitropack/dist/runtime')['useStorage']
  const writeEarlyHints: typeof import('../node_modules/h3')['writeEarlyHints']
}
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler, useRuntimeConfig, useStorage, useNitroApp, defineNitroPlugin, nitroPlugin, defineRenderHandler, getRouteRules, useAppConfig, useEvent, defineTask, runTask, defineNitroErrorHandler } from '../node_modules/nitropack/dist/runtime';
export { appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { useDatabase } from '../node_modules/nitropack/dist/runtime/database';
export { buildAssetsURL as __buildAssetsURL, publicAssetsURL as __publicAssetsURL } from '../node_modules/nuxt/dist/core/runtime/nitro/paths';
export { defineAppConfig } from '../node_modules/nuxt/dist/core/runtime/nitro/config';
export { default as pathForRedirect } from '../utils/normalize-path';
