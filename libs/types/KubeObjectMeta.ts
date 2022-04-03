// https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/
export default interface KubeObjectMeta {
  name: string;
  generateName?: string;
  namespace?: string;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };

  // ----------------------------
  // System
  // ----------------------------
  finalizers?: string[];
  // To do continue

  // ----------------------------
  // Readonly
  // ----------------------------
  readonly creationTimestamp?: string;
  readonly deletionGracePeriodSeconds?: number;
  readonly deletionTimestamp?: string;
  readonly generation?: number;
  readonly resourceVersion?: string;
  readonly selfLink?: string;
  readonly uid?: string;
}
