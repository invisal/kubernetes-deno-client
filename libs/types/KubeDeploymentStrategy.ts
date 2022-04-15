interface KubeRollingUpdateDeployment {
  maxSurge: number | string;
  maxUnavailable: number | string;
}

// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#deploymentstrategy-v1-apps
export default interface KubeDeploymentStrategy {
  type: "Recreate" | "RollingUpdate";
  rollingUpadte: KubeRollingUpdateDeployment;
}
