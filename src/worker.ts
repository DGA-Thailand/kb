import handler, { createScheduledHandler, PluginBridge } from '@emdash-cms/cloudflare/worker';

// Sandboxed plugins are deliberately not enabled: they require Workers Paid.
// This export is harmless without them and keeps the entry point extensible.
export { PluginBridge };

export default {
  ...handler,
  scheduled: createScheduledHandler(),
};
