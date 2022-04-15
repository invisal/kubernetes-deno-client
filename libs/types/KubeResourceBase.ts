import KubeObjectMeta from "./KubeObjectMeta.ts";

export default interface KubeResourceBase {
  metadata?: KubeObjectMeta;
}
