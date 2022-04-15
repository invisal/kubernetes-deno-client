/* eslint-disable */
import KubeRequestBase from "./KubeRequestBase.ts";
import KubeResource from "./types/KubeResource.ts";

export default class KubeRequest extends KubeRequestBase {
  // Deployments
  // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#deployment-v1-apps
  getDeployment = async (namespace: string, name: string) => await this.handleGetPattern("/apis/apps/v1", "deployments", namespace, name);
  getDeployments = async (namespace?: string) => await this.handleGetListPattern("/apis/apps/v1", "deployments", namespace);
  createDeployments = async (namespace: string, resource: KubeResource) => await this.handleCreatePattern("/api/v1", "deployments", namespace, resource);
  deleteDeployments = async (namespace: string, name: string) => await this.handleDeletePattern("/api/v1", "deployments", namespace, name);
  updateDeployments = async (namespace: string, resource: KubeResource) => await this.handleUpdatePattern("/api/v1", "deployments", namespace, resource);

  // ConfigMap
  // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#configmap-v1-core
  getConfigMap = async (namespace: string, name: string) => await this.handleGetPattern("/api/v1", "configmaps", namespace, name);
  getConfigMaps = async (namespace?: string) => await this.handleGetListPattern("/api/v1", "configmaps", namespace);
  createConfigMap = async (namespace: string, resource: KubeResource) => await this.handleCreatePattern("/api/v1", "configmaps", namespace, resource);
  deleteConfigMap = async (namespace: string, name: string) => await this.handleDeletePattern("/api/v1", "configmaps", namespace, name);
  updateConfigMap = async (namespace: string, resource: KubeResource) => await this.handleUpdatePattern("/api/v1", "configmaps", namespace, resource);
}
